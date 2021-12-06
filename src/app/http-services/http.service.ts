import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService {
  protected constructor(
    protected httpClient: HttpClient,
    @Inject('applicationServerHost') protected readonly applicationServerHost: string
  ) {}
}
