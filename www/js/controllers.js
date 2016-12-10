//We are defining a standart module called 'demoro.controllers' that have some dependencies.
//This strategy to separate controllers in diferent files will make the application more human-readable.
angular.module('takahanga.controllers',
[
  'takahanga.activities',
  'takahanga.user',
  'takahanga.services'
])
