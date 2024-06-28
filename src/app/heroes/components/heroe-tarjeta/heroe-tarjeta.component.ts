import { Component,Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  /* TODO(mdc-migration): The following rule targets internal classes of card that may no longer apply for the MDC version. */
  mat-card{
    margin-top: 20px;
  }
  `]
})
export class HeroeTarjetaComponent {
  @Input() heroe!: Heroe;
}
