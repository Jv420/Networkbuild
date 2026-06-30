# Development Services

Deze map is voor development-infrastructuur: websites, apps, testomgevingen, databases en CI/CD.

## Doel

Ontwikkelwerk gescheiden houden van gaming, compute en privé-netwerk.

## Aanbevolen onderdelen

```text
Development VM / VLAN
├── Test websites
├── Staging apps
├── Database testomgeving
├── GitHub runners later
└── CI/CD scripts
```

## Veilig werken

- Gebruik staging domeinen.
- Gebruik aparte testdatabases.
- Gebruik geen productie klantdata in testomgevingen.
- Zet API keys alleen in `.env` of GitHub Secrets.
- Publiceer alleen `.example` bestanden.

## Eerste services

- Docker Compose template
- Node/PHP/Python app templates later
- GitHub Actions later
