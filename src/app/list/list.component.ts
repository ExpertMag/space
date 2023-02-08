import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { BehaviorSubject, map } from 'rxjs';

import { ListItem, ListQuery, HomePortsQuery } from './list.dto';

const queryFields = gql`
  query Feed($offset: Int, $limit: Int, $search: String) {
    ships(find: {name: $search},offset: $offset, limit: $limit) {
      name
      id
      year_built
      type
    }
    shipsResult {
      result {
        totalCount
      }
    }
  }
`;

const queryHomePorts = gql`
  query HomePorts {
    ships {
      home_port
    }
  }
`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  ships: BehaviorSubject<ListItem[]> = new BehaviorSubject<ListItem[]>([]);

  homePorts: string[] = [];
  offset = 0;
  readonly limit = 10;
  totalCount = 0;
  feedQuery: QueryRef<ListQuery>;
  homePortsQuery: QueryRef<HomePortsQuery>;
  filterForm = new FormGroup({
    name: new FormControl(''),
    homePort: new FormControl([]),
    type: new FormControl(''),
  });

  // searchString = ''

  constructor(private apollo: Apollo, private cd: ChangeDetectorRef) {
    this.feedQuery = this.apollo.watchQuery<ListQuery>({
      query: queryFields,
      variables: {
        offset: this.offset,
        limit: this.limit,
        search: ''
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    });

    this.feedQuery.valueChanges
      .pipe(
        map((result) => {
          this.totalCount = result.data.shipsResult.result.totalCount;
          return result;
        })
      )
      .subscribe((data) => this.ships.next(data?.data?.ships));

    this.homePortsQuery = this.apollo.watchQuery<HomePortsQuery>({
      query: queryFields,
    });

    this.homePortsQuery.valueChanges.subscribe(
      (data) => (this.homePorts = data?.data?.ships?.map((x) => x.name))
    );
  }

  fetchNext() {
    this.offset =
      this.offset + this.limit >= this.totalCount
        ? this.totalCount
        : this.offset + this.limit;

    this.feedQuery
      .fetchMore({
        variables: {
          offset: this.offset,
          limit: this.limit,
          search: this.filterForm.controls["name"]?.value || ''
        },
      })
      .then((data) => this.ships.next(data?.data?.ships));
  }

  fetchPrev() {
    this.offset = this.offset - 10 >= 10 ? this.offset - 10 : 0;

    this.feedQuery
      .fetchMore({
        variables: {
          offset: this.offset,
          limit: 10,
          search:this.filterForm.controls["name"]?.value || ''
        },
      })
      .then((data) => this.ships.next(data?.data?.ships));
  }

  onFilterSubmit() {}

  getHomePorts() {}

  changeHomePort() {}

  onSearchKeyPress() {

    if (this.filterForm.controls["name"]?.value) {

      console.log('name',this.filterForm.controls["name"]?.value)

      this.feedQuery
        .fetchMore({
          variables: {
            offset: 0,
            limit: 10,
            search: this.filterForm.controls["name"]?.value
          },
        })
        .then((data) => this.ships.next(data?.data?.ships));
    }
  }
}
