import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAlertes } from 'app/shared/model/alertes.model';

type EntityResponseType = HttpResponse<IAlertes>;
type EntityArrayResponseType = HttpResponse<IAlertes[]>;

@Injectable({ providedIn: 'root' })
export class AlertesService {
  public resourceUrl = SERVER_API_URL + 'api/alertes';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/alertes';

  constructor(protected http: HttpClient) {}

  create(alertes: IAlertes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alertes);
    return this.http
      .post<IAlertes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(alertes: IAlertes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alertes);
    return this.http
      .put<IAlertes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAlertes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAlertes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAlertes[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(alertes: IAlertes): IAlertes {
    const copy: IAlertes = Object.assign({}, alertes, {
      date: alertes.date != null && alertes.date.isValid() ? alertes.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((alertes: IAlertes) => {
        alertes.date = alertes.date != null ? moment(alertes.date) : null;
      });
    }
    return res;
  }
}
