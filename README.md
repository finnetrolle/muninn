# README #

Muninn - это веб-приложение для отображения интерактивной карты технологического присоединения.

## Состав приложения ##

Веб-приложение состоит из двух частей:
* Frontend часть, реализованная с помощью AngularJS
* Backend часть, реализованная с помощью Spring-boot

Взаимодействие между серверной и клиентской частями реализуется с помощью REST API.

## Описание содержимого директорий ##

### Директория src.main.java ###

Директория src.main.java содержит java исходники серверной части приложения. В состав директории входят следующие директории и файлы:
* ru.trollsmedjan.muninn.configuration.* - конфигурационные классы
* ru.trollsmedjan.muninn.controllers.* - REST контроллеры, обеспечивающие REST API
* ru.trollsmedjan.muninn.filters.* - классы фильтров, расширяющие функциональность бэкенда
* ru.trollsmedjan.muninn.helpers.* - инструментальные классы, обеспечивающие дополнительную функциональность (например, парсинг Excel файлов)
* ru.trollsmedjan.muninn.model.* - классы, описывающие предметную область
* ru.trollsmedjan.muninn.model.dao.* - классы для обеспечения взаимодействия с репозиторием (БД)
* ru.trollsmedjan.muninn.Muninn.java - главный класс приложения, содержажий public static void main метод

### Директория public ###

Директория public содержит все файлы, необходимые для работы фронтенда. Эта диреткория во время запуска сервера публикуется в корневую директорию и доступна по базовому URL. В состав директории входят следующие директории и файлы:
* _garbage/* - файлы, обеспечивающие работу предыдущих версий веб-приложения. Для сохранения истории и возможных полезных наработок удаленная из проекта функциональность не удаляется а направляется в эту дииректорию
* css/* - файлы CSS
* img/* - изображения
* views/* - вьюхи в html
* js/lib/* - сторонние библиотеки
* js/cheetahApplication/connectors/* - коннекторы (сервисы для связи с REST API)
* js/cheetahApplication/controllers/* - контроллеры AngularJS
* js/cheetahApplication/directives/* - директивы AngularJS
* js/cheetahApplication/services/* - сервисы AngularJS
* js/cheetahApplication/cheetah.js - файл с роутами и инстантацией приложения

## Изменение подхода к редактированию ##
В данный момент для редактирования используется плагин Leaflet.Editable. Он, в целом, неплох, но перегружен. Для реализации нужных функций, по идее, достаточно собственного сервиса при следующих условиях:
* Необходимо реализовать geojson другим образом. Как вариант, сделать фичу для подсветки и фичу для редактирования
* Реализовать отлов событий пользователя для редактирования (mouseMove, mouseDown, mouseUp)
* Реализовать сервис, который будет обрабатывать события пользователя и создавать геометрию

## Выполненные задачи из списка Todo ##
* Отображение балуна над выделенным источником питания

## Todo ##

* Отображать в одно время либо балун, либо панель, либо инфо в аккорденое в зависимости от состояния контролов
* Бокс с легендой, фильтрующий источники питания
* Иконки всех типов и на все вольтажи
* Определение иконки из характеристик ИП
* Открытие документа по ссылке
* Сделать поддержку нового типа полигонов (раньше был vividsolutions)