# Guide d'insertion des données dans Supabase

Ce guide explique comment insérer vos vraies données du portfolio dans votre base de données Supabase.

## Données disponibles

Le fichier `supabase/migrations/002_insert_real_data.sql` contient :

### 📁 Projets (5 projets)
- LoRaWAN Plug and Play (Production)
- Mini station météo Arduino (Production)
- Logiciel dimensionnement photovoltaïque (En construction)
- Progiciel dimensionnement réseau BT (Production)
- Dashnouk Dev (En construction)

### 🎯 Compétences (18 compétences)
- **Acquises (10)** : Python, JavaScript, LoRaWAN, Zigbee, GTB/GTC, etc.
- **En apprentissage (5)** : KNX, Next.js, TypeScript, Cloud Computing, Jeedom
- **À acquérir (3)** : Machine Learning, Kubernetes, React Native

### 🎯 Objectifs (10 objectifs)
- **Objectifs annuels 2025 (4)**
- **Objectifs annuels 2026 (2)**
- **Objectifs mensuels Décembre 2025 (2)**
- **Objectifs mensuels Janvier 2026 (2)**

## Méthodes d'insertion

### Option 1: Via Supabase Dashboard (Recommandé)

1. Connectez-vous à [https://app.supabase.com](https://app.supabase.com)
2. Sélectionnez votre projet
3. Allez dans **SQL Editor** (dans la barre latérale)
4. Cliquez sur **New Query**
5. Copiez-collez le contenu du fichier `supabase/migrations/002_insert_real_data.sql`
6. Cliquez sur **Run** pour exécuter les requêtes

### Option 2: Via Supabase CLI

Si vous avez Supabase CLI installé :

```bash
# Exécuter la migration
supabase db push

# Ou exécuter directement le fichier SQL
supabase db execute --file supabase/migrations/002_insert_real_data.sql
```

### Option 3: Via psql (ligne de commande)

Si vous préférez utiliser psql directement :

```bash
psql -h <your-supabase-host> \
     -p 5432 \
     -d postgres \
     -U postgres \
     -f supabase/migrations/002_insert_real_data.sql
```

## Vérification des données

Après l'insertion, vérifiez que les données ont bien été insérées :

### Dans Supabase Dashboard
1. Allez dans **Table Editor**
2. Sélectionnez chaque table (projects, skills, goals)
3. Vérifiez que les données sont présentes

### Avec SQL
```sql
-- Compter les projets
SELECT COUNT(*) FROM projects;

-- Compter les compétences par niveau
SELECT level, COUNT(*) FROM skills GROUP BY level;

-- Compter les objectifs par scope
SELECT scope, COUNT(*) FROM goals GROUP BY scope;
```

## Réinitialiser les données

Si vous voulez réinitialiser et recommencer :

```sql
-- Supprimer toutes les données (ATTENTION : irréversible)
TRUNCATE projects, skills, goals RESTART IDENTITY CASCADE;
```

## Notes importantes

- Les IDs sont générés automatiquement par UUID
- Les dates `created_at` sont générées automatiquement
- Les projets utilisent des tableaux PostgreSQL pour le champ `stack`
- Les contraintes CHECK garantissent la cohérence des données

## Prochaines étapes

Une fois les données insérées :
1. Vérifiez que les données s'affichent correctement dans votre dashboard
2. Configurez les politiques RLS pour l'administration
3. Mettez à jour les données régulièrement selon vos besoins
