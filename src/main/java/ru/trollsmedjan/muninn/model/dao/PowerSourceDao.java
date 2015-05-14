package ru.trollsmedjan.muninn.model.dao;

import org.springframework.data.repository.CrudRepository;
import ru.trollsmedjan.muninn.model.Company;
import ru.trollsmedjan.muninn.model.PowerSource;

import java.util.Collection;

/**
 * Created by syachin on 14.05.2015.
 */
public interface PowerSourceDao extends CrudRepository<PowerSource, Long> {

    Collection<PowerSource> findByCompany(Company company);
}
