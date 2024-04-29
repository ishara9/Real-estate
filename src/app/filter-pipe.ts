import { Pipe, PipeTransform } from '@angular/core';
import { HousingLocation } from './housing-location';

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    transform(items: HousingLocation[], searchText: string): any[] {
        if (!items || !searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();

        return items.filter(item => {
            // Implement your filtering logic here
            // For example, you can check if the item's property contains the search text
            return item.city.toLowerCase().includes(searchText);
        });
    }
}