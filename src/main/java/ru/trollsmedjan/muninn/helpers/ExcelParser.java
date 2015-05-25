package ru.trollsmedjan.muninn.helpers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Component;
import ru.trollsmedjan.muninn.model.Attribute;
import ru.trollsmedjan.muninn.model.AttributeType;
import ru.trollsmedjan.muninn.model.Company;
import ru.trollsmedjan.muninn.model.PowerSource;
import ru.trollsmedjan.muninn.model.dao.AttributeDao;
import ru.trollsmedjan.muninn.model.dao.AttributeTypeDao;
import ru.trollsmedjan.muninn.model.dao.CompanyDao;
import ru.trollsmedjan.muninn.model.dao.PowerSourceDao;

/**
 * Created by syachin on 25.05.2015.
 */
@Component
public class ExcelParser {

    private final static String POWER_COLUMN_NAME = "Class";

    private final static String LOAD_COLUMN_NAME = "VolumePowerContract";

    private final static String X_COLUMN_NAME = "X";

    private final static String Y_COLUMN_NAME = "Y";

    private final static String NAME_COLUMN_NAME = "Name *";

    @Autowired
    private PowerSourceDao powerSourceDao;

    @Autowired
    private AttributeTypeDao attributeTypeDao;

    @Autowired
    private AttributeDao attributeDao;

    @Autowired
    private CompanyDao companyDao;


    public void parse(String filename) {
        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream(new File(filename));
        } catch (FileNotFoundException e) {
            System.out.println("File not found " + e.getMessage());
            return;
        }

        HSSFWorkbook workbook = null;
        try {
            workbook = new HSSFWorkbook(fileInputStream);
        } catch (IOException e) {
            System.out.println("IO Error " + e.getMessage());
            return;
        }

        HSSFSheet sheet = workbook.getSheetAt(0);

        Iterator<Row> rowIterator = sheet.iterator();

        Map<Integer, String> columnNames = new HashMap<>();
        if (rowIterator.hasNext()) {
            int i = 0;
            Iterator<Cell> cellIterator = rowIterator.next().cellIterator();
            while (cellIterator.hasNext()) {
                columnNames.put(i, cellIterator.next().getStringCellValue());
                ++i;
            }
        }

        Company company = new Company();
        company.setName("default");
        companyDao.save(company);

        List<PowerSource> powerSources = new ArrayList<>();
        List<Attribute> attributes = new ArrayList<>();
//        List<AttributeType> attributeTypes = new ArrayList<>();
        Map<String, AttributeType> attributeTypes = new HashMap<>();

        long start = System.currentTimeMillis();

        int i = 0;
        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();

            PowerSource powerSource = new PowerSource();
            powerSource.setCompany(company);
            powerSources.add(powerSource);
//            powerSourceDao.save(powerSource);

            Iterator<Cell> cellIterator = row.cellIterator();
            System.out.println(">>> Next row: " + i);


            while (cellIterator.hasNext()) {
                Cell cell = cellIterator.next();
                String attributeTypeName = columnNames.get(cell.getColumnIndex());

                AttributeType attributeType = null;
                if (attributeTypes.containsKey(attributeTypeName)) {
                    attributeType = attributeTypes.get(attributeTypeName);
                } else {
                    attributeType = new AttributeType();
                    attributeType.setName(attributeTypeName);
                    attributeTypes.put(attributeTypeName, attributeType);
                }

                Attribute attribute = new Attribute();
                attribute.setAttributeType(attributeType);
                attribute.setPowerSource(powerSource);
                switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_STRING:
                        attribute.setValue(cell.getStringCellValue());
                        break;
                    default:
                        attribute.setValue(String.valueOf(cell.getNumericCellValue()));
                }

                if (attribute.getAttributeType().getName().equals(POWER_COLUMN_NAME)) {
                    powerSource.setPower(attribute.getValue());
                } else if (attribute.getAttributeType().getName().equals(LOAD_COLUMN_NAME)) {
                    powerSource.setUsedPower(Double.valueOf(attribute.getValue()));
                } else if (attribute.getAttributeType().getName().equals(X_COLUMN_NAME)) {
                    powerSource.setLocation(new Point(Double.valueOf(attribute.getValue()), powerSource.getLocation().getY()));
                } else if (attribute.getAttributeType().getName().equals(Y_COLUMN_NAME)) {
                    powerSource.setLocation(new Point(powerSource.getLocation().getX(), Double.valueOf(attribute.getValue())));
                } else if (attribute.getAttributeType().getName().equals(NAME_COLUMN_NAME)) {
                    powerSource.setName(attribute.getValue());
                } else {
//                    attributeDao.save(attribute);
                    attributes.add(attribute);
                }

            }
            System.out.println(powerSource);
//            powerSourceDao.save(powerSource);
            powerSources.add(powerSource);

            System.out.println();
            ++i;
        }
        System.out.println("File readed at: " + (System.currentTimeMillis() - start) + " msec");

        // write to db

        start = System.currentTimeMillis();
        for (AttributeType type : attributeTypes.values()) {
            AttributeType inDb = attributeTypeDao.findOneByName(type.getName());
            if (inDb == null) {
                attributeTypeDao.save(type);
            } else {
                type.setId(inDb.getId());
            }
        }
        System.out.println("aTypes recorded at: " + (System.currentTimeMillis() - start) + " msec");
        System.out.println("count: " + attributeTypes.size());

        start = System.currentTimeMillis();
        powerSourceDao.save(powerSources);
        System.out.println("powerSources recorded at: " + (System.currentTimeMillis() - start) + " msec");
        System.out.println("count: " + powerSources.size());

        start = System.currentTimeMillis();
        attributeDao.save(attributes);
        System.out.println("attributes recorded at: " + (System.currentTimeMillis() - start) + " msec");
        System.out.println("count: " + attributes.size());

        System.out.println(company);
        System.out.println(company.getUuid().toString());

    }
}
