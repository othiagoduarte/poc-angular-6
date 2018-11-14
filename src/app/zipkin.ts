import { HttpLogger } from 'zipkin-transport-http';
import {ExplicitContext, Tracer, TraceId, BatchRecorder, jsonEncoder, Annotation, sampler, model} from 'zipkin';
import {CLSContext} from 'zipkin-context-cls';

  // Setup the tracer to use http and implicit trace context
  const tracer = new Tracer({
    ctxImpl: new ExplicitContext(),
    recorder: new BatchRecorder({
      logger: new HttpLogger({
        endpoint: 'http://localhost:9411/api/v2/spans',
        jsonEncoder: jsonEncoder.JSON_V2
      })
    }),
    localServiceName: 'poc-angular' // name of this application
  });
  export class TracerFactory {
     static get (): any {
         return tracer;
     }
  }
