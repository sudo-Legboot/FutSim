import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as data from './../assets/players.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FutSim';
  tbutton = 'Iniciar 1er Tiempo';
  ttext = "00";
  sw1 : string | null = null;
  sl:boolean =false; sr : boolean = false;
  half = 0;
  changesl = -1;
  changesr = -1;

  select(element : any){
    var exit :boolean = false;

    if(this.sw1 == null)
      this.sw1 = element.currentTarget.id;

    else if (this.sw1 == element.currentTarget.id)
      this.sw1 = null;

    else {
      if(this.sw1.charAt(0) != element.currentTarget.id.charAt(0))
        return;

      this.sw1.charAt(0) == 'l' ? (this.changesl == 0 ? exit=true : this.changesl-- ) : (this.changesr == 0 ? exit=true : this.changesr-- )

      if(exit) return;

      var pivot1 = element.currentTarget.innerHTML;
      var pivot2 = document.getElementById(this.sw1)!.innerHTML;
      element.currentTarget.innerHTML = pivot2;
      document.getElementById(this.sw1)!.innerHTML = pivot1;
      this.sw1 = null;
      
    }
  }

  teamC(element : any,side : string){
    var option = element.currentTarget.selectedOptions[0].value as string;
    var list;

    if(option == "BAR")
      list = data.players.BAR;
    else if (option == "REA")
      list=data.players.REA;


    list?.forEach(player=> {
      var zone = document.getElementById(side+player.pos)!;
      zone.innerHTML = "<img class=\"rounded-lg\" src=\""+player.photo+"\" alt=\""+player.name+"\" width=\"40\" height=\"40\">"+player.name;
    });

    side.charAt(0) == 'l' ? this.sl=true : this.sr =true;
  }

  async tiempo(){
    switch (this.half){
      case 0: //No ha empezado
        for(var i=1;i<=45;i++)
        {
          this.ttext = (i.toString().padStart(2,"0"));
          await this.sleep(50);
        }
        this.changesr = 3;
        this.changesl = 3;
        this.tbutton="Pasar al 2do Tiempo";
        this.half=1;
        break;
      case 1: //Ya esta en medio tiempo
        for(var i=46;i<=90;i++)
        {
          this.ttext = (i.toString().padStart(2,"0"));
          await this.sleep(50);
        }
        this.changesr = 0;
        this.changesl = 0;
        this.tbutton="Reiniciar";
        this.half=2;
        break;
      case 2:
        this.tbutton = 'Iniciar 1er Tiempo';
        this.ttext = "00";
        this.changesr = -1;
        this.changesl = -1;
        this.half = 0;
        (document.getElementById("teamsl")! as HTMLSelectElement).value="";
        (document.getElementById("teamsr")! as HTMLSelectElement).value="";
        this.sr=false;
        this.sl = false;
        for(var i=1;i<=17;i++)
        {
          document.getElementById("l-"+i)!.innerHTML= "";
          document.getElementById("r-"+i)!.innerHTML= "";

        }
        break;


    }

  }
  sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/*
deshabilitar coas durante tiempos
*/
