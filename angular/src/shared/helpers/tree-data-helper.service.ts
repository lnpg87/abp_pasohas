import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TreeDataHelperService {
    findNode(data, selector): any {
        const nodes = _.filter(data, selector);
        if (nodes && nodes.length === 1) {
            return nodes[0];
        }

        let foundNode = null;

        _.forEach(data, d => {
            if (!foundNode) {
                foundNode = this.findNode(d.children, selector);
            }
        });

        return foundNode;
    }

    findParent(data, nodeSelector) {
        const node = this.findNode(data, nodeSelector);
        if (!node) {
            return null;
        }

        return node.parent;
    }
}
