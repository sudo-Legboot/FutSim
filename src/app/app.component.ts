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
  sw1 : string | null = null;

  select(element : any){
    if(this.sw1 == null)
      this.sw1 = element.currentTarget.id;

    else if (this.sw1 == element.currentTarget.id)
      this.sw1 = null;

    else {
      if(this.sw1.charAt(0) != element.currentTarget.id.charAt(0))
        return;
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
    else
      list=data.players.REA;

    list.forEach(player=> {
      var zone = document.getElementById(side+player.pos)!;
      zone.innerHTML = "<img class=\"rounded-lg\" src=\""+player.photo+"\" alt=\""+player.name+"\" width=\"40\" height=\"40\">"+player.name;
    })
  }
}

/*
Boton de segundo tiempo
*/
