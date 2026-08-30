import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tituloAtual = 'Dashboard';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        const rota = this.router.routerState.root.firstChild;
        return rota?.snapshot.data['titulo'] ?? 'Dashboard';
      })
    ).subscribe(titulo => this.tituloAtual = titulo);
  }
}
