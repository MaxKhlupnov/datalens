# DataLens - изменениt лого, стиля и работы с highcharts в offline (без интернет)

## Загрузить исходный код вместе с модулями DataLens

```sh
git clone https://github.com/MaxKhlupnov/datalens --recurse-submodules
```

## Замените файлы логотипов и иконок
  [Логотип- замените svg файл в ветке] (https://github.com/MaxKhlupnov/datalens/blob/main/patch/src/ui/assets/icons/logo.svg)
  [Иконка - замените svg файл в ветке] (https://github.com/MaxKhlupnov/datalens/blob/main/patch/dist/public/favicon.ico)

## Запустите сборку проекта (предварительно нужно перейти в папку проекта)
Собирать нужно под ОС Linux, для  Windows используйте [WSL](https://learn.microsoft.com/ru-ru/windows/wsl/install).
Собранный под Windows контейнер с UI не стартует - какая-то проблема с правами (идет от основного DL).
```sh
  docker-compose build
```

## Запустите Datalens с обновленным контейнером UI
```sh
  docker-compose up -d
```

