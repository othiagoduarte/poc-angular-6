import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExplicitContext, Tracer, TraceId, BatchRecorder, jsonEncoder, Annotation, sampler, model } from 'zipkin';
import { HttpLogger } from 'zipkin-transport-http';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor() {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const  traceId  = this.getdadosZipkin(request);
        const headers = this.getHeaders(traceId);
        return next.handle(request.clone({headers}));
    }

    private getHeaders(id: TraceId) {
        return new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('X-B3-TraceId', `${id.traceId}`)
            .append('X-B3-ParentSpanId', `${id.parentId}`)
            .append('X-B3-SpanId', `${id.spanId}`);
            // .append('X-B3-Sampled', '1')
            // .append('X-B3-Flags', '1')
            // .append('X-B3-Debug', '1');
    }

    private getdadosZipkin(request: HttpRequest<any>): TraceId {
        const zipkinBaseUrl = 'http://127.0.0.1:9411';
        const tracer = new Tracer({
            ctxImpl: new ExplicitContext(),
            recorder: new BatchRecorder({
                logger: new HttpLogger({
                    jsonEncoder: jsonEncoder.JSON_V2,
                    endpoint: `${zipkinBaseUrl}/api/v1/spans`
                })
            }),
            localServiceName: 'poc-angular'
        });
        const id = tracer.createRootId();
        console.log('id -> ', id);
        tracer.scoped(() => {
            tracer.setId(id);
            tracer.recordAnnotation(new Annotation.Rpc(request.method));
            tracer.recordServiceName('poc-angular');
            tracer.recordAnnotation(new Annotation.ClientSend());
        });
        return id;
    }
}
