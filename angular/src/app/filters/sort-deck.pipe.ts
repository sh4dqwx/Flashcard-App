import { Pipe, PipeTransform } from '@angular/core';
import { Deck } from '../classes/Deck';

@Pipe({
  name: 'sortDeck',
  standalone: true
})
export class SortDeckPipe implements PipeTransform {

  transform(decks: Deck[], searchText: string): Deck[] {
    if (!decks || !searchText) {
      return decks;
    }

    return decks.filter(deck => {
      return deck.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
