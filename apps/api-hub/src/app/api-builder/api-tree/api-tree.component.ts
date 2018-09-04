import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { NzDropdownService, NzFormatEmitEvent, NzTreeNode, NzDropdownContextComponent } from 'ng-zorro-antd';


@Component({
  selector: 'ah-api-tree',
  templateUrl: './api-tree.component.html',
  styleUrls: ['./api-tree.component.scss']
})
export class ApiTreeComponent implements OnInit {

  dropdown: NzDropdownContextComponent;
  // can active only one node
  activedNode: NzTreeNode;
  dragNodeElement;
  nodes = [
    new NzTreeNode({
      title   : 'root1',
      key     : '1001',
      author  : 'ANGULAR',
      expanded: true,
      children: [
        {
          title   : 'child1',
          key     : '10001',
          author  : 'ZORRO',
          children: [
            {
              title   : 'child1.1',
              key     : '100011',
              author  : 'ZORRO',
              children: []
            },
            {
              title   : 'child1.2',
              key     : '100012',
              author  : 'ZORRO',
              children: [
                {
                  title   : 'grandchild1.2.1',
                  key     : '1000121',
                  author  : 'ZORRO-FANS',
                  isLeaf  : true,
                  checked : true,
                  disabled: true
                },
                {
                  title : 'grandchild1.2.2',
                  key   : '1000122',
                  author: 'ZORRO-FANS',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ]
    })
  ];

  @HostListener('mouseleave', [ '$event' ])
  mouseLeave(event: MouseEvent): void {
    event.preventDefault();
    if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
      this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    }
  }

  @HostListener('mousedown', [ '$event' ])
  mouseDown(): void {
    // do not prevent
    if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
      this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    }
  }

  /**
   * important:
   * if u want to custom event/node properties, u need to maintain the selectedNodesList/checkedNodesList yourself
   * @param {} data
   */
  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      // change node's expand status
      if (!data.isExpanded) {
        // close to open
        data.origin.isLoading = true;
        setTimeout(() => {
          data.isExpanded = !data.isExpanded;
          data.origin.isLoading = false;
        }, 100);
      } else {
        data.isExpanded = !data.isExpanded;
      }
    } else {
      // change node's expand status
      if (!data.node.isExpanded) {
        // close to open
        data.node.origin.isLoading = true;
        setTimeout(() => {
          data.node.isExpanded = !data.node.isExpanded;
          data.node.origin.isLoading = false;
        }, 100);
      } else {
        data.node.isExpanded = !data.node.isExpanded;
      }
    }
  }

  // 选中节点
  activeNode(data: NzFormatEmitEvent): void {
    if (this.activedNode) {
      this.activedNode = null;
    }
    data.node.isSelected = true;
    this.activedNode = data.node;
  }

  dragStart(event: NzFormatEmitEvent): void {
    // disallow drag if root or search
    this.activedNode = null;
    this.dragNodeElement = event.event.srcElement;
    if (this.dragNodeElement.className.indexOf('is-dragging') === -1) {
      this.dragNodeElement.className = event.event.srcElement.className + ' is-dragging';
    }
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>, node: NzTreeNode): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  selectDropdown(): void {
    this.dropdown.close();
    // do something
    console.log('dropdown clicked');
  }

  constructor(private nzDropdownService: NzDropdownService) {
  }

  ngOnInit(): void {

  }

}
