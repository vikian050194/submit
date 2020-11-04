#!/bin/env bash
npm i --prefix client/
npm run build --prefix client/
npm i --prefix server/
npm start --prefix client/ & npm start --prefix server/
