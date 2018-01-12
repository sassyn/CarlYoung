MOCHA?=node_modules/.bin/mocha
REPORTER?=spec
GROWL=--growl
FLAGS=$(GROWL) --reporter $(REPORTER)
test:
	$(MOCHA) --timeout 15000 $(shell find test/* -prune -name "*-test.js") $(FLAGS)

.PHONY: test
