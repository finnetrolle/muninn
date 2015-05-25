package ru.trollsmedjan.muninn.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.data.geo.Polygon;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.trollsmedjan.muninn.model.Company;
import ru.trollsmedjan.muninn.model.PowerSource;
import ru.trollsmedjan.muninn.model.dao.CompanyDao;
import ru.trollsmedjan.muninn.model.dao.PowerSourceDao;

import java.util.Iterator;
import java.util.UUID;

/**
 * Created by syachin on 14.05.2015.
 */
@RestController
@RequestMapping("/powersource")
public class PowerSourceRestController {

    @Autowired
    private PowerSourceDao powerSourceDao;

    @Autowired
    private CompanyDao companyDao;

    @RequestMapping("/testall")
    public @ResponseBody
    Iterable<PowerSource> getAllPowerSources() {
        return powerSourceDao.findAll();
    }

    @RequestMapping("/{companyId}")
    public @ResponseBody
    Iterable<PowerSource> getPowerSourcesForCompany(@PathVariable UUID companyId) {
        Company company = companyDao.findOne(companyId);
        return powerSourceDao.findByCompany(company);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{id}/addpolygon")
    public void addPolygon(@PathVariable Long id, @RequestBody Polygon polygon) {
        PowerSource powerSource = powerSourceDao.findOne(id);
        powerSource.setPolygon(polygon);
        powerSourceDao.save(powerSource);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{id}/movelocation")
    public void moveLocation(@PathVariable Long id, @RequestBody Point point) {
        PowerSource powerSource = powerSourceDao.findOne(id);
        powerSource.setLocation(point);
        powerSourceDao.save(powerSource);
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody
    PowerSource editPowerSource(@RequestBody PowerSource powerSource) {
        powerSourceDao.save(powerSource);
        return powerSource;
    }


}
