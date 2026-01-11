import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        pos => {
          const location = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };

          console.log('Latitude:', location.latitude);
          console.log('Longitude:', location.longitude);

          resolve(location);
        },
        err => reject(err)
      );
    });
  }


}
