#!/bin/bash
ng build --prod --aot --base-href "https://bocoshapers.com/"
firebase deploy
