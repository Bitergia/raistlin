# Raistlin

## Run Django Server

``` bash
# install requeriments
pip3 install -r requeriments.txt

# django migrate
python manage.py migrate --settings=config.settings.devel

# django makemigrations
python manage.py makemigrations --settings=config.settings.devel

# run server
python manage.py runserver --settings=config.settings.devel
```

Note that must be built the ui part having the minified files at the path `raistlin/ui/dist`. See next section for more information:

## Build UI Setup

```
cd ui/
```

### Install dependencies
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn run build
```

### Locally preview production build
```
yarn preview
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
