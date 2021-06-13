import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService {

  protected uri: string;

  protected constructor(
    protected httpClient: HttpClient,
    @Inject('applicationServerHost') protected readonly applicationServerHost: string
  ) {}

  protected getUrl(): string {
    return `${this.applicationServerHost}/${this.uri}`;
  }
}
