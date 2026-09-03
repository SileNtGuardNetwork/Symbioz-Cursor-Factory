# Symbioz Cursor Factory

[![Validate Foundation](https://github.com/SileNtGuardNetwork/Symbioz-Cursor-Factory/actions/workflows/validate.yml/badge.svg)](https://github.com/SileNtGuardNetwork/Symbioz-Cursor-Factory/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Open-source операционная система для Cursor, которая помогает основателям и разработчикам проектировать, собирать, проверять и выпускать SaaS-продукты.

[English version](README.md)

## Статус

**Ранняя alpha.** Рабочий фундамент уже собран, но полная установка и MCP-контур пока не прошли операционную проверку на чистом внешнем компьютере.

Текущая готовность:

| Слой | Статус |
|---|---|
| Продуктовые и архитектурные контракты | Документированы |
| Универсальные Cursor Rules | Реализованы |
| Первые Agent Skills | Реализованы |
| Validator репозитория | Реализован |
| GitHub Actions validation | Настроена, проверка ожидается |
| Обнаружение Rules и Skills в Cursor | Нужна локальная проверка |
| MCP-подключения | Пока документация, нужна OAuth-проверка |
| Публичный release | Не готов |

Первый публичный milestone должен доказать полный Cursor-first workflow:

```text
идея
-> продуктовый brief
-> архитектура
-> контролируемая реализация
-> code review и security review
-> автоматические проверки
-> browser QA
-> синхронизация документации
-> подготовка release
```

## Что это за продукт

Symbioz Cursor Factory упаковывает управляемый AI-development workflow в версионируемые и повторно используемые элементы:

- Cursor Rules для архитектуры, разработки, дизайна, безопасности, QA и документации
- Agent Skills для повторяемых продуктовых задач
- отобранные MCP-профили для полного SaaS-контура
- границы подтверждения для production, базы данных, секретов, платных сервисов и destructive actions
- quality gates, требующие доказательств, а не слов агента
- полный гайд по настройке Cursor
- проектные контракты и примеры, проверяемые на реальных SaaS

## Чем проект не является

- не обещает собрать любой продукт без инженерного контроля
- не является случайной коллекцией промтов и MCP
- не заменяет тестирование, security review, legal review и решения владельца продукта
- пока не является стабильным production-ready release

## Что уже входит

### Cursor Rules

- базовый рабочий контракт
- архитектура
- контролируемая реализация
- независимая проверка
- QA
- дизайн
- безопасность
- документация

### Agent Skills

- product brief
- architecture
- controlled implementation
- browser QA
- code review
- security review
- documentation sync
- release preparation

### Документация

- [Установка](docs/INSTALLATION.md)
- [Настройки Cursor](docs/CURSOR_SETTINGS.md)
- [MCP-профили](docs/MCP_PROFILES.md)
- [Каталог MCP](docs/MCP_CATALOG.md)
- [FAQ](docs/FAQ.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Release checklist](docs/RELEASE_CHECKLIST.md)
- [Пример проектного контракта](examples/PROJECT_CONTRACT.md)

## Быстрая проверка

Требования:

- Git
- Node.js 20 или новее
- Cursor для локальной проверки обнаружения Rules и Skills

```bash
git clone https://github.com/SileNtGuardNetwork/Symbioz-Cursor-Factory.git
cd Symbioz-Cursor-Factory
npm test
```

Успешная проверка заканчивается статусом:

```text
PASS_FOUNDATION_VALIDATION
```

Для текущей alpha-установки в другой проект следуй [docs/INSTALLATION.md](docs/INSTALLATION.md). Нельзя копировать в Git MCP-конфигурацию с секретами.

## Принципы

1. **Доказательства важнее заявлений.** Задача не завершена без проверки.
2. **Минимально необходимые права.** Инструменты получают только нужный доступ.
3. **Сначала план и архитектура, потом код.**
4. **Маленькие контролируемые изменения.** Без скрытого расширения scope.
5. **Необратимые действия подтверждает человек.** Production, migrations, secrets, внешние расходы и destructive actions требуют approval.
6. **Проверка на реальных SaaS.** Универсальные решения извлекаются из работающих продуктов.
7. **Cursor-first.** Основной experience строится под Cursor, но открытые форматы используются там, где это возможно.

## Первый поддерживаемый стек

- Cursor
- GitHub
- Next.js
- TypeScript
- Supabase или PostgreSQL
- Vercel
- Figma
- shadcn/ui
- Playwright
- Chrome DevTools

Другие стеки и интеграции будут добавляться только после фактической проверки ядра.

## Карта документации

| Документ | Назначение |
|---|---|
| [PRODUCT.md](PRODUCT.md) | Определение продукта, аудитория, scope и non-goals |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Архитектура репозитория и workflow |
| [AGENTS.md](AGENTS.md) | Универсальный рабочий контракт агентов |
| [ROADMAP.md](ROADMAP.md) | Путь до публичного release через доказанные статусы |
| [SECURITY.md](SECURITY.md) | Security reporting и правила работы с секретами |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Правила участия в проекте |

## Безопасность

Нельзя коммитить API keys, tokens, OAuth credentials, cookies, `.env`, клиентские данные, приватный исходный код и raw MCP-конфигурацию с секретами. Смотри [SECURITY.md](SECURITY.md).

## Участие в проекте

Сейчас проект находится в founder-led alpha. Внешние contributions будут открываться по мере стабилизации контрактов. Смотри [CONTRIBUTING.md](CONTRIBUTING.md).

## План

Смотри [ROADMAP.md](ROADMAP.md).

## Лицензия

MIT. Смотри [LICENSE](LICENSE).

## Дисклеймер

Symbioz Cursor Factory является независимым open-source проектом и не связан с Cursor или Anysphere.
