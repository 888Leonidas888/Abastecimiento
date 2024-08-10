/* Run when Salmon_DB_dev is already created */

USE Salmon_DB_dev;

INSERT INTO batches (id, created_at, updated_at) VALUES 
('0d84fe6', '2024-07-06', '2024-06-27'), 
('c6f41da', '2024-07-02', '2024-07-12'), 
('b367313', '2024-06-19', '2024-07-17'), 
('7b91902', '2024-07-01', '2024-06-25'), 
('b2c5d82', '2024-07-16', '2024-06-28'), 
('a890b6b', '2024-07-12', '2024-07-14'), 
('0dc8f62', '2024-06-25', '2024-07-08'), 
('4e510f9', '2024-07-07', '2024-06-30'), 
('0a76414', '2024-06-28', '2024-07-17'), 
('606316c', '2024-07-12', '2024-07-11'), 
('38f1d33', '2024-07-03', '2024-07-03'), 
('776ec5a', '2024-06-19', '2024-07-06'), 
('940936c', '2024-06-27', '2024-06-28'), 
('fd56d26', '2024-07-15', '2024-07-01'), 
('ad2538e', '2024-07-17', '2024-07-01');

INSERT INTO products (id, batch_id, sku, description, origin, destination, status, due_date, freshness, qr_pallet, created_at, updated_at) VALUES 
('362c547', '0d84fe6', 255685, 'Pepsi-bottle 1lx6', 'SE-3-8', 'SE-17-10', 'error', '2024-07-15', 'no comercializable', '728WHSBQ9I161UOPXOPHT3BW7', '2024-06-27', '2024-06-25'), 
('0288b7f', 'c6f41da', 259845, 'Inca Kola-can 350mlx24', 'SE-19-10', 'SE-15-8', 'error', '2024-07-09', 'baja', 'OWZ6SEFYWQQIHTAHQQKDI4WLF', '2024-06-23', '2024-06-21'), 
('84d49c1', 'b367313', 235489, 'Sprite-can 350mlx24', 'SE-3-6', 'SE-17-7', 'pendiente', '2024-07-12', 'media', '28ZJMAJ8E96D8R94RX8QH01F7', '2024-07-12', '2024-07-13'), 
('88da533', '7b91902', 204157, 'Coca Cola-can 350mlx24', 'SE-2-5', 'SE-5-8', 'completado', '2024-07-04', 'media', '7HLX22A90R97WAYEXFSQ1N7V8', '2024-07-03', '2024-07-16'), 
('cf27352', 'b2c5d82', 269736, 'Fanta-bottle 1lx6', 'SE-10-9', 'SE-12-2', 'proceso', '2024-07-09', 'no comercializable', 'QUN4577VQYLLBR7DS6C634NA5', '2024-06-20', '2024-06-27'), 
('c25acc2', 'a890b6b', 267489, 'Inca Kola-bottle 1lx6', 'SE-18-4', 'SE-7-9', 'error', '2024-07-06', 'cuentas', 'IQAM2ODILV9Q6H2I56DKCLMGR', '2024-07-12', '2024-07-12'), 
('b6ea56e', '0dc8f62', 246587, 'Pepsi-pet 500mlx12', 'SE-19-8', 'SE-20-1', 'error', '2024-07-04', 'no comercializable', 'CHVXAP49M84FULHYB2351HVBW', '2024-07-08', '2024-07-14'), 
('4d3c0c8', '4e510f9', 235678, 'Fanta-can 350mlx24', 'SE-1-3', 'SE-13-2', 'error', '2024-06-24', 'cuentas', '3T30CV1MU46X3INIT5C0PDTNY', '2024-07-12', '2024-06-25'), 
('d05b364', '0a76414', 298575, 'Coca Cola-pet 500mlx12', 'SE-9-4', 'SE-4-1', 'proceso', '2024-07-16', 'cuentas', 'CXVG1SX17LSW2J0M9IIU37MOF', '2024-06-29', '2024-06-22'), 
('c00c04d', '606316c', 302548, 'Pepsi-can 350mlx24', 'SE-10-8', 'SE-14-10', 'completado', '2024-07-03', 'baja', 'YO1EF9C06635O4M1FU90LKPPU', '2024-06-19', '2024-06-27'), 
('a867fa4', '38f1d33', 215847, 'Sprite-bottle 1lx6', 'SE-19-2', 'SE-15-8', 'error', '2024-06-25', 'media', 'MXGFL4EZDFPG37NTI42DKHY7L', '2024-07-02', '2024-07-15'), 
('05d5d2d', '776ec5a', 212121, 'Inca Kola-pet 500mlx12', 'SE-14-3', 'SE-1-4', 'completado', '2024-06-27', 'no comercializable', '5NE4QW68UJVLQ2PEQWPJ82VK7', '2024-07-11', '2024-07-08'), 
('41ae07f', '940936c', 245768, 'Sprite-pet 500mlx12', 'SE-16-10', 'SE-19-4', 'error', '2024-07-10', 'no comercializable', 'VZGEXRH5HV9RAUEZ0YPY8FEG5', '2024-07-15', '2024-07-14'), 
('3167876', 'fd56d26', 202123, 'Coca Cola-pet 500mlx12', 'SE-12-6', 'SE-17-1', 'proceso', '2024-07-01', 'media', 'VSCX8DXY8A0K40Y7Y9E7KQAXA', '2024-07-13', '2024-06-23'), 
('4460178', 'ad2538e', 232425, 'Inca Kola-can 350mlx24', 'SE-5-7', 'SE-6-9', 'error', '2024-07-06', 'media', 'GQ9DCUJL01DAU1SM53UE9ZH5U', '2024-06-27', '2024-07-13');

INSERT INTO users (id, dni, user, password, name_user, last_name_user, permission, created_at, updated_at) VALUES 
('7dfc85a3-4d08-4ab5-a4c3-dc68c08e61e5', '12121212', 'Nami', '$2b$12$XSO23xee/BeEfqtWYCq6A.yrTPlu5J9gC.kxwlN0ePbA4urRTOWzm', 'Nami', 'Unthinkable', 'operador', '2024-08-08', '2024-08-08'),
('8ce07df3-3047-4c1a-a317-df4dbcac945a', '76392794', 'Plainsphere', '$2b$12$b8rAZvQn/8/ZS6dzSTsrY.xwXco4Al36CXMsgoGflNL.oELK2W8RW', 'Ennzo', 'Ponce', 'administrador', '2024-08-02', '2024-08-02'),
('04162dbf-0bf6-4dcd-84ce-17fc53702d59', '77777777', 'aprado', '$2b$12$l7hPU6e0BBzKCxJCq0OYf.AQQcGO6UTkAyWahCUoeCHbw2XTQOnga', 'Alexander', 'Prado ', 'administrador', '2024-08-08', '2024-08-08'),
('7510978e-4318-43c4-8442-3a853c4b1d89', '99999999', 'echanjan', '$2b$12$IHnUiagxv6jDh1NyxzZdRObq8kOGuewuQhaniQknDN7GTsBfZwCVi', 'Erick', 'Chanjan', 'administrador', '2024-08-08', '2024-08-08'),
('2fe045f3-e604-4797-933b-eed4478f157c', '88888888', 'jescriba', '$2b$12$GevxPw1SUVxceC89n2TrAesRwq8/SwxkGdrgWOdqddAwt.szzVmKC', 'Jhony', 'Escriba', 'administrador', '2024-08-08', '2024-08-08');

INSERT INTO productivity (id_user, qr_pallet, created_at) VALUES 
('8ce07df3-3047-4c1a-a317-df4dbcac945a', '728WHSBQ9I161UOPXOPHT3BW7', '2024-07-09'),
('7dfc85a3-4d08-4ab5-a4c3-dc68c08e61e5', 'OWZ6SEFYWQQIHTAHQQKDI4WLF', '2024-06-30'),
('7510978e-4318-43c4-8442-3a853c4b1d89', '28ZJMAJ8E96D8R94RX8QH01F7', '2024-06-26'),
('04162dbf-0bf6-4dcd-84ce-17fc53702d59', '7HLX22A90R97WAYEXFSQ1N7V8', '2024-07-04'),
('2fe045f3-e604-4797-933b-eed4478f157c', 'IQAM2ODILV9Q6H2I56DKCLMGR', '2024-07-05'),
('7dfc85a3-4d08-4ab5-a4c3-dc68c08e61e5', 'CHVXAP49M84FULHYB2351HVBW', '2024-06-28'); 
