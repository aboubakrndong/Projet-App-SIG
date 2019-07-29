package com.atos.operatappli.repository.search;

import com.atos.operatappli.domain.Kpi;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Kpi} entity.
 */
public interface KpiSearchRepository extends ElasticsearchRepository<Kpi, Long> {
}
