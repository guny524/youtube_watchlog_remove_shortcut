.PHONY: install lint build build-dev clean clean-profile

# Block direct "make node_modules" call
ifneq (,$(filter node_modules,$(MAKECMDGOALS)))
$(error Use "make install" instead)
endif

install: node_modules

node_modules: package.json package-lock.json
	npm install

lint: install
	npx tsc --noEmit
	npx eslint . --max-warnings 30 --fix
	npx jscpd src/
	npx knip
	npx depcruise src --config .dependency-cruiser.cjs

build: lint
	npm run build
	npm run zip

build-dev: lint
	npm run build -- --mode development
	@echo ""
	@echo "=========================================="
	@echo "Development build complete!"
	@echo ""
	@echo "To load the extension in Chrome:"
	@echo "1. Open chrome://extensions/"
	@echo "2. Enable 'Developer mode' (top right)"
	@echo "3. Click 'Load unpacked'"
	@echo "4. Select: .output/chrome-mv3-dev"
	@echo "=========================================="

clean:
	rm -rf node_modules logs .wxt .output

clean-profile: clean
	rm -rf .test-profile
