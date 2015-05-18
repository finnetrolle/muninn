package ru.trollsmedjan.muninn.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.trollsmedjan.muninn.model.Attribute;
import ru.trollsmedjan.muninn.model.PowerSource;
import ru.trollsmedjan.muninn.model.dao.AttributeDao;
import ru.trollsmedjan.muninn.model.dao.AttributeTypeDao;
import ru.trollsmedjan.muninn.model.dao.PowerSourceDao;


/**
 * Created by syachin on 14.05.2015.
 */
@RestController
@RequestMapping("/attribute/{powerSourceId}")
public class AttributeRestController {

    @Autowired
    private AttributeDao attributeDao;

    @Autowired
    private AttributeTypeDao attributeTypeDao;

    @Autowired
    private PowerSourceDao powerSourceDao;

    @RequestMapping
    public @ResponseBody
    Iterable<Attribute> getAttributes(@PathVariable Long powerSourceId) {
        PowerSource powerSource = powerSourceDao.findOne(powerSourceId);
        return attributeDao.findByPowerSource(powerSource);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addAttribute(@PathVariable Long powerSourceId, @RequestBody Attribute attribute) {
        PowerSource powerSource = powerSourceDao.findOne(powerSourceId);
        attribute.setPowerSource(powerSource);
        attributeTypeDao.save(attribute.getAttributeType());
        attributeDao.save(attribute);
    }




}
