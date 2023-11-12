import { Component, OnInit } from '@angular/core';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import { BackEndPhpService } from '../services/back-end-php.service';


interface Empresas {
  name: string;
  router: string
  children?: Empresas[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  router:string;
  level: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //   treeControl = new NestedTreeControl<Empresas>(node => node.children);
  //   dataSource = new MatTreeNestedDataSource<Empresas>();
  usuarioLogado: any

  private _transformer = (node: Empresas, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      router: node.router,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  constructor(private _services:BackEndPhpService){

    this.usuarioLogado = this._services.getUsuarioLogado()

    this._services.getMenus(this.usuarioLogado.id).subscribe(
      (data:any) =>  this.dataSource.data = data
    )
  }

  ngOnInit() {
    console.log(this.usuarioLogado)
  }

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  recolherMenu(item:ExampleFlatNode) {
    if(this.treeControl.isExpanded(item) && item.level == 0) {
      this.treeControl.collapseAll();
      this.treeControl.expand(item);
    }

  }


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}


