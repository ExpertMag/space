import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Item, ItemQuery } from './item.dto';

const queryFields = gql`
  query Item($id: ID) {
    ships(find: { id: $id }) {
      name
      type
      year_built
      home_port
      weight_kg
      missions {
        name
      }
    }
  }
`;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  ship: Observable<Item | undefined>;
  feedQuery: QueryRef<ItemQuery>;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private location: Location
  ) {
    const shipId = this.route.snapshot.paramMap.get('id');

    this.feedQuery = this.apollo.watchQuery<ItemQuery>({
      query: queryFields,
      variables: {
        id: shipId,
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    });

    this.ship = this.feedQuery.valueChanges.pipe(
      map((result) =>
        result?.data?.ships?.length === 1 ? result?.data?.ships[0] : undefined
      )
    );
  }

  goBack() {
    this.location.back();
  }
}
