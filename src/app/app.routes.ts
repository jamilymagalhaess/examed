import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'agendar-exame',
    loadChildren: () =>
      import('./pages/agendar-exame/agendar-exame.module').then(
        (m) => m.AgendarExameModule
      ),
  },
  {
    path: 'cadastrar-exame',
    loadChildren: () =>
      import('./pages/cadastrar-exame/cadastrar-exame.module').then(
        (m) => m.CadastrarExameModule
      ),
  },
  {
    path: 'listar-exame',
    loadChildren: () =>
      import('./pages/listar-exame/listar-exame.module').then(
        (m) => m.ListarExameModule
      ),
  },
  {
    path: '',
    redirectTo: 'agendar-exame',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'agendar-exame',
  },
];
