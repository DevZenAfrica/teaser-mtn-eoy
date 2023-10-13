import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    //loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    loadChildren: () => import('./send-advice/send-advice.module').then( m => m.SendAdvicePageModule)
  },
  {
    path: 'poll/:id',
    loadChildren: () => import('./preview-poll/preview-poll.module').then(m => m.PreviewPollPageModule)
  },
  {
    path: 'headline/:id',
    loadChildren: () => import('./preview-headline/preview-headline.module').then( m => m.PreviewHeadlinePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'search/:texte',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'send-advice',
    loadChildren: () => import('./send-advice/send-advice.module').then( m => m.SendAdvicePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
