package ru.trollsmedjan.muninn.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.trollsmedjan.muninn.model.AttributeType;
import ru.trollsmedjan.muninn.model.dao.AttributeTypeDao;

/**
 * Created by syachin on 14.05.2015.
 */
@RestController
@RequestMapping("/attributetype")
public class AttributeTypeRestController {

    @Autowired
    private AttributeTypeDao attributeTypeDao;

    @RequestMapping
    public @ResponseBody
    Iterable<AttributeType> getAll() {
        return attributeTypeDao.findAll();
    }

}
