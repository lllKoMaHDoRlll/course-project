
import { Component, ElementRef, inject, OnInit, QueryList,ViewChild, ViewChildren } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { ExerciseChainData } from '../../../interfaces/exercises-data';
import { exercisesService } from '../../../services/database/exercises.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';
import { TelegramService } from '../../../telegram.service';

@Component({
  selector: 'app-exercise-chain',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoadingComponent],
  templateUrl: './exercise-chain.component.html',
  styleUrl: './exercise-chain.component.scss'
})
export class ExerciseChainComponent implements OnInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLDivElement>;
  @ViewChild('lines') linesContainer!: ElementRef<HTMLOrSVGImageElement>;
  @ViewChildren('word') wordsRefs!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('wordsContainer') wordsContainer!: ElementRef<HTMLDivElement>;
  wordsHistory: ExerciseChainData[] = [];
  wordsPositions: {
    x: number,
    y: number
  }[] = [{x: 0, y: 0}];
  telegram = inject(TelegramService);

  pseudoAnswer: string = "";

  constructor() {
    this.telegram.showBackButton();
  }

  async ngOnInit() {
    await this.addWord({type: "input", isPlaceHolder: true, word: ""});
  }

  onScroll = (event: Event) => {
    this.linesContainer.nativeElement.style.top =  (-1 * (event.target as HTMLDivElement).scrollTop) + "px";
    this.linesContainer.nativeElement.style.height = "calc(100% + " + (event.target as HTMLDivElement).scrollHeight + "px)";
  }

  scrollToBottom = () => {
    this.wordsContainer.nativeElement.scrollTo({top: this.wordsContainer.nativeElement.scrollHeight, behavior: "smooth"});
    console.log(1);
  }

  handleAnswer = async () => {

  }

  handleInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    this.pseudoAnswer = target.value;
  }

  addWord = async (lastWord: ExerciseChainData) => {
    await this.addWordNode(lastWord);
    const newWord = await exercisesService.getWordForChain(lastWord.isPlaceHolder ? undefined : lastWord);
    if (!newWord) return;
    await this.addWordNode(newWord);
  }

  sendWord = async (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const outputWord: ExerciseChainData = {
      type: "output",
      word: value
    };

    this.pseudoAnswer = "";

    this.addWord(outputWord);
  }

  addWordNode = async (newWord: ExerciseChainData) => {
    this.wordsHistory[this.wordsHistory.length - 1] = newWord;
    this.wordsHistory.push({type: this.wordsHistory.length % 2 ? "output" : "input", isPlaceHolder: true, word: ""});
    setTimeout(() => {
      const canvasRect = this.canvasRef.nativeElement?.getBoundingClientRect();
      const placeholderRect = this.wordsRefs.last.nativeElement.getBoundingClientRect();

      this.wordsPositions.at(-1)!.x = placeholderRect!.left - canvasRect!.left - 1 + placeholderRect!.width / 2;
      this.wordsPositions.at(-1)!.y = placeholderRect!.top - canvasRect!.top - 1 + placeholderRect!.height / 2 + this.wordsContainer.nativeElement.scrollTop;
      this.wordsPositions.push({
        x: placeholderRect!.left - canvasRect!.left - 1 + placeholderRect!.width / 2,
        y: placeholderRect!.top - canvasRect!.top - 1 + placeholderRect!.height / 2 + this.wordsContainer.nativeElement.scrollTop
      });

      this.scrollToBottom();
    }, 1);
  }

  calculatePathCommands = (index: number): string => {
    if (index == 0) return '';

    const from_x = this.wordsPositions[index - 1].x;
    const from_y = this.wordsPositions[index - 1].y;
    const to_x = this.wordsPositions[index].x;
    const to_y = this.wordsPositions[index].y;

    let mul = -1;
    if (index % 2) mul = 1;

    const command = `M ${from_x},${from_y} C ${from_x + 125 * mul},${from_y} ${to_x - 125 * mul},${to_y} ${to_x},${to_y}`;
    return command;
  }
}
