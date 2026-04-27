-- Mutfak Yazılım PostgreSQL Initialization Script
-- Premium performance ve security optimizasyonları

-- Create extensions for premium features
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Premium search optimization
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom functions for premium features
CREATE OR REPLACE FUNCTION generate_slug(input_text text)
RETURNS text AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                unaccent(trim(input_text)), 
                '[^a-zA-Z0-9\s-]', '', 'g'
            ), 
            '\s+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create premium analytics view helpers
CREATE OR REPLACE FUNCTION calculate_rating_trend(business_id_param text, days_param integer DEFAULT 30)
RETURNS TABLE(date date, avg_rating numeric, review_count bigint) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        date_trunc('day', r.created_at)::date as date,
        ROUND(AVG(r.rating), 2) as avg_rating,
        COUNT(*)::bigint as review_count
    FROM reviews r
    WHERE r.business_id = business_id_param
        AND r.created_at >= NOW() - INTERVAL '1 day' * days_param
        AND r.rating IS NOT NULL
    GROUP BY date_trunc('day', r.created_at)
    ORDER BY date;
END;
$$ LANGUAGE plpgsql; 