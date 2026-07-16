# Zero to One — convenience targets for the frontend app
# Usage: make <target>

FRONTEND_DIR := frontend
NPM := npm --prefix $(FRONTEND_DIR)

.PHONY: help install dev build preview lint clean-docs clean content

help: ## Show available targets
	@echo "Zero to One"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  %-14s %s\n", $$1, $$2}'

install: ## Install frontend npm dependencies
	$(NPM) install

content: ## Sync language readmes into frontend/public/content
	$(NPM) run predev

dev: ## Start Vite dev server (syncs content first)
	$(NPM) run dev

build: ## Clean ../docs, sync content, production build into docs/
	$(NPM) run build

preview: ## Preview the production build (base /ZeroToOne/)
	$(NPM) run preview

lint: ## Run oxlint on the frontend
	$(NPM) run lint

clean-docs: ## Delete the root docs/ folder
	node $(FRONTEND_DIR)/scripts/clean-docs.mjs

clean: clean-docs ## Remove docs/ and generated public/content
	rm -rf $(FRONTEND_DIR)/public/content
	@echo "[clean] removed frontend/public/content"

# Optional: full reinstall
reinstall: ## Remove node_modules and reinstall
	rm -rf $(FRONTEND_DIR)/node_modules
	$(NPM) install
