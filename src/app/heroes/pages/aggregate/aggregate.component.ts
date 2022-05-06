import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px
    }
  `]
})
export class AggregateComponent implements OnInit {

  constructor(private heroeService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.router.url.includes('edit')){
      this.activatedRoute.params
      .pipe(
        switchMap(({id}) =>this.heroeService.getHeroeByCode(id))
      )
      .subscribe( heroe => this.heroe = heroe );
    }
  }

  heroe: Heroe = {
    superhero:'',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  };

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  guardar(){
    if(this.heroe.superhero.trim().length === 0)
    {
      return;
    }
    if(this.heroe.id){
      //actualizar
      this.heroeService.updateHeroe(this.heroe)
      .subscribe(heroe => {
        this.mostrarSnackBar('Registro actualizado');
      });
    }else{
      //crear
      this.heroeService.addHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/edit', heroe.id]);
        this.mostrarSnackBar('Registro creado');
      });
    }
  }

  borrar(){
    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe(result => {
        if(result){
          this.heroeService.deleteHeroe(this.heroe.id!)
            .subscribe(resp =>{
              this.router.navigate(['/heroes']);
            });
        }
      })

  }  

  mostrarSnackBar(mensaje: string): void{
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }
}
