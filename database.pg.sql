-- ph... SQLINES DEMO ***
-- ve... SQLINES DEMO ***
-- SQLINES DEMO *** admin.net/
--
-- H�... SQLINES DEMO ***
-- SQLINES DEMO *** n. 12 juil. 2024 à 12:53
-- SQLINES DEMO *** r : 8.0.31
-- SQLINES DEMO *** 7.4.33

START TRANSACTION;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS admin (
  id SERIAL PRIMARY KEY,
  email varchar(30) NOT NULL,
  password varchar(300) NOT NULL,
  firstname varchar(30) NOT NULL,
  connexionTime timestamp(0) NOT NULL,
  reset_token varchar(255) DEFAULT NULL,
  reset_token_expiration timestamp(0) DEFAULT NULL
) ;

SELECT SETVAL(pg_get_serial_sequence('admin', 'id'), 33);

TRUNCATE TABLE admin;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO admin (id, email, password, firstname, connexionTime, reset_token, reset_token_expiration) VALUES
(2, 'm.treizebre@gmail.com', '$2b$10$//jhiRFgY9Idaj8xLO2XouKfXy26Dpaai1hZ8x0kd3HMUmmRhgRA2', 'mandy', '2024-06-13 09:16:43', '98b47ef704501e1523b749db43167183e84e6d45', '2024-06-13 15:14:26'),
(32, 'essai@gmail.com', '$2b$10$GDbiatGAwgMMvmzeb6Fj0eci/yxZ6QUrpDO4R4EYln2nk.Qmc8.X2', 'Benoît', '2024-07-08 03:36:01', NULL, NULL);

-- SQLINES DEMO *** ---------------------------------------

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS category_informations (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  picture varchar(150) NOT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('category_informations', 'id'), 9);

TRUNCATE TABLE category_informations;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO category_informations (id, name, picture) VALUES
(1, 'Dépendances', 'addictions.jpg'),
(2, 'Grossesse', 'grossesse.jpg'),
(3, 'Enfance', 'enfance.jpg'),
(4, 'Nutrition', 'nutrition.jpg'),
(5, 'Santé Physique ', 'sante_physique.jpg'),
(6, 'Maladie chronique', 'maladie-chronique.jpg'),
(7, 'Prévention', 'health_informations_default_picture.jpg'),
(8, 'Personnes agées ', 'personne-agee.jpg');

-- SQLINES DEMO *** ---------------------------------------

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS days (
  id SERIAL PRIMARY KEY,
  day_name varchar(30) NOT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('days', 'id'), 8);


TRUNCATE TABLE days;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO days (id, day_name) VALUES
(1, 'Lundi'),
(2, 'Mardi'),
(3, 'Mercredi'),
(4, 'Jeudi'),
(5, 'Vendredi'),
(6, 'Samedi'),
(7, 'Dimanche');

-- SQLINES DEMO *** ---------------------------------------

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS external_professionals (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  picture varchar(200) NOT NULL,
  link varchar(60) NOT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('external_professionals', 'id'), 30);


TRUNCATE TABLE external_professionals;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO external_professionals (id, name, picture, link) VALUES
(1, 'Centre hospitalier de Vichy modifié', 'images/hopitalvichy.jpg', 'https://www.ch-vichy.fr/'),
(2, 'Centre hospitalier de Moulins', 'images/hopitalmoulins.jpg', 'https://www.ch-moulins-yzeure.fr/'),
(3, 'Centre hospitalier coeur du bourbonnais', 'images/chcoeurbourbonnais.png', 'https://www.ch-coeurdubourbonnais.fr/'),
(4, 'Ehpad de Gayette ', 'images/gayette.png', 'https://ehpad-gayette.fr/'),
(28, 'Nouveau pro externe', 'images/chuclermont.jpg', 'https://www.ch-vichy.fr');

-- SQLINES DEMO *** ---------------------------------------


-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS health_informations (
  id SERIAL PRIMARY KEY,
  title varchar(100) NOT NULL,
  description varchar(500) NOT NULL,
  image varchar(100) NOT NULL,
  link varchar(200) NOT NULL,
  category int NOT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('health_informations', 'id'), 35);

CREATE INDEX link_category ON health_informations (category);


TRUNCATE TABLE health_informations;


-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO health_informations (id, title, description, image, link, category) VALUES
(2, 'Le calendrier de grossesse ', 'Suivez mois après mois la grossesse : depuis l’embryon jusqu’au bébé en passant par le fœtus, l’évolution de votre grossesse semaine par semaine, les examens et papiers à ne pas oublier… Et profitez-en, vous avez 9 mois pour vous préparer...', 'pregnant-woman.jpg', 'https://www.sante.fr/le-calendrier-de-grossesse', 2),
(3, 'La santé de l''enfant ', 'Une équipe de spécialistes vous accueille dans les centres de PMI et vous accompagne avant et après la naissance de votre enfant. Elle veille à favoriser son épanouissement et contribue au bien-être familial.rnDès les premiers jours et tout au long de la petite enfance, conseils et soutien vous sont proposés ainsi que des informations sur les besoins de votre enfant...', '452.jpg', 'https://www.sante.fr/la-sante-de-lenfant', 3),
(4, 'Manger mieux ', 'Il n''existe pas de recette ni de régime alimentaire miracle pour bien manger. Avant tout, cela revient à adopter une alimentation variée et équilibrée. En résumé : on peut manger de tout, mais en quantités adaptées, en privilégiant les aliments bénéfiques à notre santé (fruits, légumes, légumes secs, féculents (de préférence complets ou semi-complets), poissons…) et en limitant la consommation d’aliments gras, sucrés, salés, ultra-transformés et de boissons sucrées...', 'manger-mieux.jpg', 'https://www.mangerbouger.fr/manger-mieux', 4),
(5, 'Activités physiques ', 'Il est aujourd’hui démontré que la pratique régulière de l’exercice physique contribue à la prévention de nombreuses maladies chroniques (maladies cardiovasculaires, cancer du sein et du colon, notamment) et au traitement de certaines pathologies....', 'yoga.jpg', 'https://www.sante.fr/activites-physiques', 5),
(6, 'Hypertension artérielle', 'rnrnLe médecin propose la réalisation d’un relevé d’automesure par le patient lui-même pour affirmer le diagnostic d’une hypertension artérielle afin de mettre en place un traitement adapté et efficace.rn...', 'hypertension.jpg', 'https://www.ameli.fr/allier/medecin/sante-prevention/pathologies/diagnostic-hta-automesure-tensionnelle', 6),
(7, 'prévention1', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet', 'prevention.jpg', 'www.google.fr', 7),
(8, 'alcool1', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet', 'prevention.jpg', 'www.google.fr', 8),
(9, 'Comprendre les addictions ', 'L’addiction est une pathologie qui repose sur la consommation répétée d’un produit (tabac, alcool, drogues…) ou la pratique anormalement excessive d’un comportement (jeux, temps sur les réseaux sociaux…) qui conduit à : une perte de contrôle du niveau de consommation/pratique,rnune modification de l’équilibre émotionnel....', 'addictions.jpg', 'https://www.sante.fr/addictions-du-plaisir-la-dependance', 1),
(10, 'Le suivi médical de la grossesse', 'Une grossesse, c’est tout à fait naturel. Ce n’est pas une maladie. Mais cela implique tout de même un suivi médical régulier.rn rnAu tout début, il n’est jamais facile de s’y retrouver, de savoir qui aller voir, quand, et pourquoi. On peut se sentir un peu perdue…', 'echo.jpg', 'https://www.sante.fr/le-suivi-medical-de-la-grossesse', 2),
(11, 'Le sommeil de l''enfant ', 'Chaque enfant a son propre rythme de sommeil et ses besoins. Les parents qui ont plusieurs enfants ont pu le remarquer : l’un peut être couche-tôt, tandis que l’autre est un couche-tard. Certains ont besoin de beaucoup de sommeil, d’autres moins !', 'sommeil-enfant.jpg', 'https://www.sante.fr/le-sommeil-de-lenfant', 3),
(12, 'A chaque âge sa nutrition ', 'rnrnLes conseils concernant la nutrition sont à adapter à chaque âge de la vie. L’éducation à une alimentation équilibrée se fait dès l’enfance.....rn', 'article-nutrition.jpg', 'https://www.sante.fr/chaque-age-sa-nutrition', 4),
(13, 'Activité physique pour les femmes à la ménopause', 'Pratiquer une activité physique régulière et limiter la sédentarité est particulièrement important pendant la ménopause. En effet, c’est une période de fragilité des os, qui perdent de leur densité. L’activité physique peut ralentir cette perte de densité osseuse.', 'physique-senior.jpg', 'https://www.sante.fr/activite-physique-pour-les-femmes-la-menopause', 5),
(14, 'Maladie rénale chronique ', 'rnLa maladie rénale chronique est une diminution du fonctionnement des reins qui ne filtrent plus correctement le sang. L'' hypertension artérielle et le diabète sont les causes les plus fréquentes. Le traitement ralentit la progression de l''insuffisance rénale...', 'maladie-renale.jpg', 'https://www.ameli.fr/allier/assure/sante/themes/maladie-renale-chronique', 6),
(15, 'prévention2', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam -- aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet', 'prevention.jpg', 'www.google.fr', 7),
(16, 'alcool2', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet', 'prevention.jpg', 'www.google.fr', 8);

-- SQLINES DEMO *** ---------------------------------------


-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title varchar(50) NOT NULL,
  details varchar(200) NOT NULL,
  picture varchar(80) NOT NULL,
  external_link varchar(150) NOT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('news', 'id'), 22);


TRUNCATE TABLE news;


-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO news (id, title, details, picture, external_link) VALUES
(1, 'Octobre Rose', 'Le cancer du sein est la tumeur maligne la plus fréquente chez la femme. Dans 95 % des cas, il s''agit d''un adénocarcinome. Certains facteurs de risque de cancer du sein sont connus...rn', 'octobre-rose.png', 'https://www.ameli.fr/assure/sante/themes/cancer-sein/comprendre-cancer-sein'),
(2, 'Aides auditives', 'Quand les réaliser ? Durant la 1re année, l’assuré a le droit à 3 rendez-vous de contrôle : ils ont lieu au 3e, 6e et 12e mois après l’achat de l’appareil…', 'audition.jpg', 'https://www.ameli.fr/allier/assure/actualites/aides-auditives-il-est-important-de-realiser-les-rendez-vous-de-controle'),
(3, 'Bien vieillir', 'Les plus de 60 ans pourraient représenter 1/3 de la population en 2050.La priorité aujourd’hui n’est plus d’allonger la durée de la vie mais d’améliorer la qualité de vie des personnes vieillissantes.', 'vieillissement.jpg', 'https://www.santepubliquefrance.fr/la-sante-a-tout-age/la-sante-a-tout-age/bien-vieillir'),
(4, 'Mois sans tabac', 'En vous inscrivant à Mois sans tabac, vous recevrez des conseils quotidiens pour arrêter de fumer, vous pourrez recevoir gratuitement votre kit d''aide...', 'logo-mst.png', 'https://mois-sans-tabac.tabac-info-service.fr/'),
(5, 'Aides auditives', 'Quand les réaliser ? Durant la 1re année, l’assuré a le droit à 3 rendez-vous de contrôle : ils ont lieu au 3e, 6e et 12e mois après l’achat de l’appareil…', 'audition.jpg', 'https://www.ameli.fr/cote-d-opale/assure/sante/themes/tabac'),
(6, 'La rentrée', 'Il est important de veiller régulièrement à la santé et au développement de son enfant et la rentrée est le bon moment pour le faire le point. ', 'santeJeunesse.jpg', 'https://www.ameli.fr/cote-d-opale/assure/actualites/la-rentree-c-est-le-bon-moment-pour-faire-le-point-sur-la-sante-de-son-enfant-0'),
(21, 'nouvelle actu', 'détails nouvelle actu ', 'images/doctolib.png', 'http://www.vichy.fr');

-- --------------------------------------------------------


CREATE TABLE IF NOT EXISTS pharmacies (
  id SERIAL PRIMARY KEY,
  name varchar(200) NOT NULL,
  address varchar(200) NOT NULL,
  phone varchar(10) NOT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('pharmacies', 'id'), 9);

--
-- Tronquer la table avant d'insérer pharmacies
--

TRUNCATE TABLE pharmacies;


-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO pharmacies (id, name, address, phone) VALUES
(1, 'Pharmacie 1', 'Addresse de la pharmacie 1', '0000000000'),
(2, 'Pharmacie 2', 'Addresse de la pharmacie 2', '0000000000'),
(3, 'Pharmacie 3', 'Addresse de la pharmacie 3', '0000000000'),
(4, 'Pharmacie 4', 'Addresse de la pharmacie 4', '0000000000'),
(5, 'Pharmacie 5', 'Addresse de la pharmacie 5', '0000000000'),
(6, 'Pharmacie 6', 'Addresse de la pharmacie 6', '0000000000'),
(7, 'Pharmacie 7', 'Addresse de la pharmacie 7', '0000000000'),
(8, 'Pharmacie ', 'Adresse de la pharmacie 8', '0000000000');

-- SQLINES DEMO *** ---------------------------------------


-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS pharmacies_schedules (
  id SERIAL PRIMARY KEY,
  pharmacy_id int NOT NULL,
  date date NOT NULL,
  start_time time(0) NOT NULL,
  end_time time(0) NOT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('pharmacies_schedules', 'id'), 7);

CREATE INDEX pharmacy_id ON pharmacies_schedules (pharmacy_id);


TRUNCATE TABLE pharmacies_schedules;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO pharmacies_schedules (id, pharmacy_id, date, start_time, end_time) VALUES
(1, 1, '2024-07-11', '08:00:00', '10:00:00'),
(2, 2, '2024-07-12', '20:00:00', '08:00:00'),
(3, 1, '2024-07-13', '20:00:00', '14:00:00'),
(4, 2, '2024-07-14', '08:00:00', '22:00:00'),
(5, 4, '2024-07-15', '08:00:00', '22:00:00'),
(6, 8, '2024-07-11', '10:00:00', '19:00:00');

-- SQLINES DEMO *** ---------------------------------------



-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS planning (
  id SERIAL PRIMARY KEY,
  pro_id int NOT NULL,
  day_id int NOT NULL,
  h_start_morning time(0) NOT NULL,
  h_end_morning time(0) NOT NULL,
  h_start_afternoon time(0) NOT NULL,
  h_end_afternoon time(0) NOT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('planning', 'id'), 187);

CREATE INDEX link_day_id ON planning (day_id);
CREATE INDEX link_pro_id ON planning (pro_id);

--
-- SQLINES DEMO ***  avant d'insérer `planning`
--

TRUNCATE TABLE planning;
--
-- SQLINES DEMO ***  données de la table `planning`
--

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO planning (id, pro_id, day_id, h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon) VALUES
(1, 1, 1, '09:00:00', '12:00:00', '14:00:00', '19:00:00'),
(2, 1, 2, '08:00:00', '12:00:00', '14:00:00', '19:00:00'),
(3, 1, 3, '09:00:00', '12:00:00', '14:00:00', '19:00:00'),
(4, 1, 4, '09:00:00', '12:00:00', '00:00:00', '00:00:00'),
(5, 1, 5, '09:00:00', '12:00:00', '14:00:00', '19:00:00'),
(6, 3, 1, '08:00:00', '12:30:00', '13:30:00', '17:30:00'),
(7, 3, 2, '09:00:00', '12:30:00', '13:30:00', '17:30:00'),
(8, 3, 4, '09:00:00', '12:30:00', '13:30:00', '18:45:00'),
(10, 3, 5, '09:00:00', '00:00:00', '00:00:00', '17:00:00'),
(11, 5, 1, '09:00:00', '12:00:00', '13:30:00', '19:00:00'),
(12, 5, 2, '09:00:00', '12:00:00', '13:30:00', '19:00:00'),
(13, 5, 3, '09:00:00', '12:00:00', '13:30:00', '19:00:00'),
(14, 5, 4, '09:00:00', '12:00:00', '13:30:00', '19:00:00'),
(15, 5, 6, '09:00:00', '12:00:00', '00:00:00', '00:00:00'),
(16, 6, 2, '09:00:00', '12:00:00', '15:00:00', '19:00:00'),
(17, 6, 3, '09:00:00', '12:00:00', '13:30:00', '19:00:00'),
(18, 6, 5, '09:00:00', '12:00:00', '13:30:00', '17:00:00'),
(19, 6, 6, '09:00:00', '13:00:00', '00:00:00', '00:00:00'),
(20, 11, 3, '09:00:00', '12:00:00', '13:30:00', '19:00:00'),
(21, 11, 4, '09:00:00', '12:00:00', '13:30:00', '19:00:00'),
(22, 11, 5, '09:00:00', '12:00:00', '13:30:00', '18:00:00'),
(23, 14, 1, '09:00:00', '12:00:00', '14:00:00', '18:00:00'),
(24, 14, 2, '09:00:00', '12:00:00', '14:00:00', '18:00:00'),
(25, 14, 4, '09:00:00', '12:00:00', '16:00:00', '18:00:00'),
(26, 14, 5, '09:00:00', '12:00:00', '16:00:00', '18:00:00'),
(27, 14, 6, '09:00:00', '12:00:00', '00:00:00', '00:00:00'),
(28, 15, 1, '10:00:00', '12:30:00', '16:30:00', '19:30:00'),
(29, 15, 2, '09:00:00', '12:30:00', '16:30:00', '19:30:00'),
(30, 15, 3, '10:00:00', '12:30:00', '15:00:00', '18:00:00'),
(31, 15, 4, '09:00:00', '12:30:00', '16:30:00', '19:30:00'),
(32, 15, 5, '09:00:00', '12:30:00', '16:30:00', '19:30:00'),
(33, 15, 6, '10:00:00', '13:00:00', '00:00:00', '00:00:00'),
(34, 16, 1, '08:30:00', '13:00:00', '16:00:00', '20:00:00'),
(35, 16, 2, '08:30:00', '13:00:00', '00:00:00', '00:00:00'),
(36, 16, 3, '09:00:00', '13:00:00', '16:00:00', '20:00:00'),
(37, 16, 4, '08:30:00', '13:30:00', '16:00:00', '20:00:00'),
(38, 16, 5, '08:30:00', '13:00:00', '00:00:00', '00:00:00'),
(39, 17, 2, '09:00:00', '13:00:00', '16:00:00', '20:00:00'),
(40, 17, 3, '08:30:00', '13:00:00', '00:00:00', '00:00:00'),
(41, 17, 4, '09:00:00', '13:00:00', '00:00:00', '00:00:00'),
(42, 17, 5, '08:30:00', '13:00:00', '16:00:00', '20:00:00'),
(43, 19, 1, '07:30:00', '00:00:00', '00:00:00', '20:00:00'),
(44, 19, 2, '07:30:00', '00:00:00', '00:00:00', '20:00:00'),
(45, 19, 3, '07:30:00', '00:00:00', '00:00:00', '20:00:00'),
(46, 19, 4, '07:30:00', '00:00:00', '00:00:00', '20:00:00'),
(47, 19, 5, '07:30:00', '00:00:00', '00:00:00', '20:00:00'),
(48, 19, 6, '07:30:00', '00:00:00', '00:00:00', '20:00:00'),
(49, 20, 1, '06:45:00', '00:00:00', '00:00:00', '20:00:00'),
(50, 20, 2, '06:45:00', '00:00:00', '00:00:00', '20:00:00'),
(51, 20, 3, '06:45:00', '00:00:00', '00:00:00', '20:00:00'),
(52, 20, 4, '06:45:00', '00:00:00', '00:00:00', '20:00:00'),
(53, 20, 5, '06:45:00', '00:00:00', '00:00:00', '20:00:00'),
(54, 20, 6, '06:45:00', '00:00:00', '00:00:00', '20:00:00'),
(55, 21, 1, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(56, 21, 2, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(57, 21, 3, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(58, 21, 4, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(60, 21, 6, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(61, 22, 1, '08:30:00', '00:00:00', '00:00:00', '19:30:00'),
(62, 22, 2, '08:30:00', '00:00:00', '00:00:00', '19:30:00'),
(63, 22, 3, '08:30:00', '00:00:00', '00:00:00', '19:30:00'),
(64, 22, 4, '08:30:00', '13:00:00', '00:00:00', '00:00:00'),
(65, 22, 5, '08:30:00', '00:00:00', '00:00:00', '19:30:00'),
(66, 23, 1, '08:30:00', '00:00:00', '00:00:00', '19:30:00'),
(67, 23, 2, '08:30:00', '00:00:00', '00:00:00', '19:30:00'),
(68, 23, 3, '08:30:00', '00:00:00', '00:00:00', '19:30:00'),
(69, 23, 4, '08:30:00', '00:00:00', '00:00:00', '19:30:00'),
(70, 23, 5, '08:30:00', '00:00:00', '00:00:00', '19:30:00'),
(71, 24, 1, '09:00:00', '00:00:00', '00:00:00', '17:00:00'),
(72, 24, 2, '09:00:00', '00:00:00', '00:00:00', '19:00:00'),
(73, 24, 3, '09:00:00', '00:00:00', '00:00:00', '19:00:00'),
(74, 24, 4, '09:00:00', '00:00:00', '00:00:00', '19:00:00'),
(75, 24, 5, '09:00:00', '12:00:00', '00:00:00', '00:00:00'),
(76, 25, 1, '08:30:00', '00:00:00', '00:00:00', '16:30:00'),
(77, 25, 2, '08:30:00', '00:00:00', '00:00:00', '16:30:00'),
(78, 25, 3, '08:15:00', '00:00:00', '12:00:00', '00:00:00'),
(79, 25, 4, '08:30:00', '00:00:00', '00:00:00', '16:30:00'),
(80, 25, 5, '08:15:00', '00:00:00', '00:00:00', '19:30:00'),
(81, 26, 1, '08:00:00', '12:00:00', '00:00:00', '00:00:00'),
(82, 26, 2, '08:00:00', '12:00:00', '00:00:00', '00:00:00'),
(83, 26, 3, '08:00:00', '12:00:00', '00:00:00', '00:00:00'),
(84, 26, 4, '08:00:00', '12:00:00', '00:00:00', '00:00:00'),
(85, 26, 5, '08:00:00', '12:00:00', '00:00:00', '00:00:00'),
(86, 27, 1, '00:00:00', '00:00:00', '14:00:00', '19:00:00'),
(87, 27, 2, '08:45:00', '12:15:00', '14:00:00', '19:00:00'),
(88, 27, 3, '08:45:00', '12:15:00', '14:00:00', '19:00:00'),
(89, 27, 4, '08:45:00', '12:15:00', '14:00:00', '19:00:00'),
(90, 27, 5, '08:45:00', '12:15:00', '14:00:00', '19:00:00'),
(91, 27, 6, '08:45:00', '12:15:00', '00:00:00', '00:00:00'),
(92, 28, 1, '00:00:00', '00:00:00', '14:00:00', '19:00:00'),
(93, 28, 2, '08:45:00', '12:15:00', '14:00:00', '19:00:00'),
(94, 28, 3, '08:45:00', '12:15:00', '14:00:00', '19:00:00'),
(95, 28, 4, '08:45:00', '12:15:00', '14:00:00', '19:00:00'),
(96, 28, 5, '08:45:00', '12:15:00', '14:00:00', '19:00:00'),
(98, 29, 1, '08:15:00', '12:30:00', '13:30:00', '18:30:00'),
(99, 29, 2, '08:00:00', '00:00:00', '00:00:00', '19:00:00'),
(100, 29, 3, '08:15:00', '12:30:00', '13:30:00', '18:30:00'),
(101, 29, 5, '08:15:00', '12:30:00', '13:30:00', '18:30:00'),
(102, 30, 1, '09:00:00', '00:00:00', '00:00:00', '20:00:00'),
(103, 30, 3, '09:00:00', '00:00:00', '00:00:00', '20:00:00'),
(104, 30, 5, '09:00:00', '00:00:00', '00:00:00', '20:00:00'),
(105, 31, 1, '09:00:00', '13:00:00', '14:00:00', '19:00:00'),
(106, 31, 2, '08:30:00', '13:00:00', '14:00:00', '19:00:00'),
(107, 31, 3, '08:30:00', '13:00:00', '14:00:00', '19:00:00'),
(108, 31, 6, '09:15:00', '13:30:00', '00:00:00', '00:00:00'),
(144, 90, 1, '20:00:00', '00:00:00', '00:00:00', '08:00:00'),
(145, 90, 2, '20:00:00', '00:00:00', '00:00:00', '08:00:00'),
(146, 90, 3, '20:00:00', '00:00:00', '00:00:00', '08:00:00'),
(147, 90, 4, '20:00:00', '00:00:00', '00:00:00', '08:00:00'),
(148, 90, 5, '20:00:00', '00:00:00', '00:00:00', '08:00:00'),
(149, 90, 6, '00:00:00', '00:00:00', '12:00:00', '00:00:00'),
(150, 90, 7, '24:00:00', '00:00:00', '00:00:00', '07:59:00'),
(184, 110, 1, '10:00:00', '00:00:00', '00:00:00', '17:00:00'),
(185, 1, 6, '08:00:00', '12:00:00', '00:00:00', '00:00:00'),
(186, 115, 1, '09:00:00', '12:00:00', '14:00:00', '17:00:00');

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** able `professionals`
--

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS professionals (
  id SERIAL PRIMARY KEY,
  lastname varchar(100) DEFAULT NULL,
  firstname varchar(50) DEFAULT NULL,
  address varchar(50) DEFAULT NULL,
  zip varchar(5) DEFAULT NULL,
  city varchar(50) DEFAULT NULL,
  phone varchar(10) DEFAULT NULL,
  details varchar(100) DEFAULT NULL,
  speciality_id int DEFAULT NULL,
  isActive smallint NOT NULL DEFAULT '1',
  picture varchar(100) DEFAULT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('professionals', 'id'), 116);

CREATE INDEX LienSpe ON professionals (speciality_id);

--
-- SQLINES DEMO ***  avant d'insérer `professionals`
--

TRUNCATE TABLE professionals;
--
-- SQLINES DEMO ***  données de la table `professionals`
--

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO professionals (id, lastname, firstname, address, zip, city, phone, details, speciality_id, isActive, picture) VALUES
(1, 'Dr Allagnat', 'Fabrice', '24 rue Jean Jaurès', '03150', 'Varennes-Sur-Allier', '0470450119', '', 1, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(3, 'Dr Chassot', 'Anne', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470450119', '', 1, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(5, 'Dr Lafarge', 'Christophe', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470450119', '', 1, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(6, 'Dr Fradin', 'Patrice', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470450119', 'Orthodontie', 1, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(11, 'Dr Rocher', 'Lucas', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470450119', '', 1, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(14, 'Dr Mariottini', 'Pierre-Marie', '15 rue Claude Labonde', '03150', 'Varennes-Sur-Allier', '0470451704', 'Suivi des enfants dès la naissance', 10, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(15, 'Dr Mure', 'Philippe', '1 rue Jules Dupré', '03150', 'Varennes-Sur-Allier', '0470457929', 'Suivi des enfants dès la naissance', 10, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(16, 'Dr Provent', 'Benoît', '4 rue du quatre septembre', '03150', 'Varennes-Sur-Allier', '0470497053', '', 10, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(17, 'Dr Regnier', 'Adeline', '4 rue du quatre septembre', '03150', 'Varennes-Sur-Allier', '0470497053', 'Suivi des enfants dès la naissance rnSuivi gynécologique', 10, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(19, 'Cabinet de Patricia Chinellato et de Blandine Eglizot ', 'Collaborateurs : Ophélie Baudon et Loïc Fayet', '18 rue Brunette', '03150', 'Varennes-Sur-Allier', '0470451010', 'Du lundi au dimanche de 7h30 à20h à domicile', 2, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(20, 'Cabinet de Marie-Hélène Gaudrat et Audrey Meunier', '', '2 rue de Beaupuy', '03150', 'Varennes-Sur-Allier', '0470450765', 'Du lundi au dimanche de 6h45 à 20h à domicile', 2, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(21, 'Cabinet de Olivier Hetault et Pascaline Piessat ', 'Collaborateurs : Sophie Da Costa et Sandra Guitton', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470474306', 'Du lundi au dimanche', 2, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(22, 'Compton', 'Thomas', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470456258', 'Kinésithérapeute', 4, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(23, 'Dumas', 'Régis', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470456258', 'Kinésithérapeute - Ostéopathe', 4, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(24, 'Legrand', 'Amaury', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470456258', 'Kinésithérapeute', 4, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(25, 'Mathely', 'Cécile', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470456258', 'Kinésithérapeute - Ostéopathe', 4, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(26, 'Laboratoire', 'Maymat', '4 Place du champ de mars ', '03150', 'Varennes-Sur-Allier', '0470457171', 'Médecins et Pharmaciens biologistes rnDocteur Véronique Siquier rnDocteur Sarah Raymond', 5, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(27, 'Pharmacie', 'Beauvy', '23 rue de l’hôte de ville', '03150', 'Varennes-Sur-Allier', '0470450125', 'phiebeauvy03@gmail.com', 6, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(28, 'Pharmacie', 'Roche', '1 Place de l’église', '03150', 'Varennes-Sur-Allier', '0470450125', 'pharmacie.roche03@gmail.com', 6, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(29, 'Vermare', 'Amélie', '19 rue de Vouroux', '03150', 'Varennes-Sur-Allier', '0470474099', 'Podologue Pédicure D.E. conventionnée', 7, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(30, 'Buvat', 'Anne-Sophie', '5 Bis rue du quatre septembre', '03150', 'Varennes-Sur-Allier', '0630594707', 'cpbuvat@gmail.com', 8, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(31, 'Cognet', 'Lisa', '4 rue du quatre septembre', '03150', 'Varennes-Sur-Allier', '0602487970', 'lisa.cognet.psychomotricite@gmail.com', 9, 1, 'females-doctor-hospital-with-stethoscope-modified.png'),
(90, 'AMLAPS : Association des Médecins libéraux de l''Allier', 'Association des Médecins libéraux de l''Allier', '', '', '', '0470485787', '', 10, 0, 'females-doctor-hospital-with-stethoscope-modified.png'),
(110, 'AJOUT ET MODIFICATION aevec caractères spéciaux -', 'Nouveau Professionnel', '9 bis rue d''île de france', '03150', 'Cournon d''auvergne', '0000000000', 'https://www.cabinetmedical-provent-regnier.fr/', 1, 1, 'default-image-professional.png'),
(111, 'Ajout d''un nouveau-professionnel de santé', 'Ajout d''un nouveau-professionnel de santé', '9 bis rue d''île de france', '03150', 'Cournon d''auvergne', '0000000000', 'Ostéopathe et spécialisé dans l''accompagnement', 2, 1, 'default-image-professional.png'),
(112, 'Ajout d''un nouveau professionnel de santé -', 'Ajout d''un nouveau professionnel de santé -', '9 bis rue d''île de france', '03150', 'Cournon d''auvergne', '0000000000', 'Ostéopathe et spécialisé dans l''accompagnement', 1, 1, 'default-image-professional.png'),
(113, 'Ajout d''un nouveau professionnel de santé -', 'Ajout d''un nouveau professionnel de santé -', '9 bis rue d''île de france', '03150', 'Cournon d''auvergne', '0000000000', 'https://www.cabinetmedical-provent-regnier.fr/', 2, 1, 'default-image-professional.png'),
(114, 'Mouré', 'Ajout d''un nouveau-professionnel de santé', '9 bis rue d''île de france', '03150', 'Cournon d''auvergne', '0000000000', 'Ostéopathe et spécialisé dans l''accompagnement', 1, 1, 'default-image-professional.png'),
(115, 'new pro', 'new pro', 'new pronew pro', '03150', 'new pro', '0000000000', 'new pro', 2, 1, 'default-image-professional.png');

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** able `specializations`
--

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS specializations (
  id SERIAL PRIMARY KEY,
  name_spe varchar(100) NOT NULL,
  picture varchar(50) NOT NULL,
  key_url varchar(50) NOT NULL
)  ;

SELECT SETVAL(pg_get_serial_sequence('specializations', 'id'), 11);

--
-- SQLINES DEMO ***  avant d'insérer `specializations`
--

TRUNCATE TABLE specializations;
--
-- SQLINES DEMO ***  données de la table `specializations`
--

-- SQLINES LICENSE FOR EVALUATION USE ONLY
INSERT INTO specializations (id, name_spe, picture, key_url) VALUES
(1, 'Dentistes', 'dentistes.jpg', 'dentistes'),
(2, 'Infirmiers', 'infirmiers.jpg', 'infirmiers'),
(4, 'Kinésithérapeutes/Ostéopathes', 'kines.jpg', 'kines-osteos'),
(5, 'Laboratoire', 'laboratoire.jpg', 'laboratoire'),
(6, 'Pharmacies', 'pharmacies.jpg', 'pharmacies'),
(7, 'Podologue', 'podologue.jpg', 'podologue'),
(8, 'Psychologue', 'psychologue.jpg', 'psychologue'),
(9, 'Psychomotricienne', 'psychomotricienne.jpg', 'psychomotricienne'),
(10, 'Médecins', 'medecins.jpg', 'medecins');

--
-- SQLINES DEMO *** les tables déchargées
--

--
-- SQLINES DEMO *** la table `health_informations`
--
ALTER TABLE health_informations
  ADD CONSTRAINT link_category FOREIGN KEY (category) REFERENCES category_informations (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- SQLINES DEMO *** la table `pharmacies_schedules`
--
ALTER TABLE pharmacies_schedules
  ADD CONSTRAINT pharmacy_id FOREIGN KEY (pharmacy_id) REFERENCES pharmacies (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- SQLINES DEMO *** la table `planning`
--
ALTER TABLE planning
  ADD CONSTRAINT link_day_id FOREIGN KEY (day_id) REFERENCES days (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT link_pro_id FOREIGN KEY (pro_id) REFERENCES professionals (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- SQLINES DEMO *** la table `professionals`
--
ALTER TABLE professionals
  ADD CONSTRAINT LienSpe FOREIGN KEY (speciality_id) REFERENCES specializations (id) ON DELETE SET NULL ON UPDATE RESTRICT;
COMMIT;
