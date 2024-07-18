/* Run when Salmon_DB_dev is already created */

USE Salmon_DB_dev;

INSERT INTO products (id, batch_id, sku, description, origin, destination, status, due_date, freshness, qr_pallet, created_at, updated_at) VALUES 
('362c547', '0d84fe6', 'PQPU2W08SK', 'Pepsi-bottle 1lx6', 'SE-3-8', 'SE-17-10', 'error', '2024-07-15', 'no comercializable', '728WHSBQ9I161UOPXOPHT3BW7', '2024-06-27', '2024-06-25'), 
('0288b7f', 'c6f41da', 'H8VX2X3LZI', 'Inca Kola-can 350mlx24', 'SE-19-10', 'SE-15-8', 'error', '2024-07-09', 'baja', 'OWZ6SEFYWQQIHTAHQQKDI4WLF', '2024-06-23', '2024-06-21'), 
('84d49c1', 'b367313', 'YD7D72BB0A', 'Sprite-can 350mlx24', 'SE-3-6', 'SE-17-7', 'pendiente', '2024-07-12', 'media', '28ZJMAJ8E96D8R94RX8QH01F7', '2024-07-12', '2024-07-13'), 
('88da533', '7b91902', 'FRF9B40BY4', 'Coca Cola-can 350mlx24', 'SE-2-5', 'SE-5-8', 'completado', '2024-07-04', 'media', '7HLX22A90R97WAYEXFSQ1N7V8', '2024-07-03', '2024-07-16'), 
('cf27352', 'b2c5d82', 'GQV95RULD7', 'Fanta-bottle 1lx6', 'SE-10-9', 'SE-12-2', 'proceso', '2024-07-09', 'no comercializable', 'QUN4577VQYLLBR7DS6C634NA5', '2024-06-20', '2024-06-27'), 
('c25acc2', 'a890b6b', 'NPWY4137OT', 'Inca Kola-bottle 1lx6', 'SE-18-4', 'SE-7-9', 'error', '2024-07-06', 'cuentas', 'IQAM2ODILV9Q6H2I56DKCLMGR', '2024-07-12', '2024-07-12'), 
('b6ea56e', '0dc8f62', '48HZZL57BV', 'Pepsi-pet 500mlx12', 'SE-19-8', 'SE-20-1', 'error', '2024-07-04', 'no comercializable', 'CHVXAP49M84FULHYB2351HVBW', '2024-07-08', '2024-07-14'), 
('4d3c0c8', '4e510f9', 'RK8QPZWGO1', 'Fanta-can 350mlx24', 'SE-1-3', 'SE-13-2', 'error', '2024-06-24', 'cuentas', '3T30CV1MU46X3INIT5C0PDTNY', '2024-07-12', '2024-06-25'), 
('d05b364', '0a76414', 'B67VPSGXVP', 'Coca Cola-pet 500mlx12', 'SE-9-4', 'SE-4-1', 'proceso', '2024-07-16', 'cuentas', 'CXVG1SX17LSW2J0M9IIU37MOF', '2024-06-29', '2024-06-22'), 
('c00c04d', '606316c', '97C9KB6NRO', 'Pepsi-can 350mlx24', 'SE-10-8', 'SE-14-10', 'completado', '2024-07-03', 'baja', 'YO1EF9C06635O4M1FU90LKPPU', '2024-06-19', '2024-06-27'), 
('a867fa4', '38f1d33', '8236T8038A', 'Sprite-bottle 1lx6', 'SE-19-2', 'SE-15-8', 'error', '2024-06-25', 'media', 'MXGFL4EZDFPG37NTI42DKHY7L', '2024-07-02', '2024-07-15'), 
('05d5d2d', '776ec5a', 'XCIAV5D8ES', 'Inca Kola-pet 500mlx12', 'SE-14-3', 'SE-1-4', 'completado', '2024-06-27', 'no comercializable', '5NE4QW68UJVLQ2PEQWPJ82VK7', '2024-07-11', '2024-07-08'), 
('41ae07f', '940936c', 'G5N9LVLNBK', 'Sprite-pet 500mlx12', 'SE-16-10', 'SE-19-4', 'error', '2024-07-10', 'no comercializable', 'VZGEXRH5HV9RAUEZ0YPY8FEG5', '2024-07-15', '2024-07-14'), 
('3167876', 'fd56d26', 'D8XMXLZGEJ', 'Coca Cola-pet 500mlx12', 'SE-12-6', 'SE-17-1', 'proceso', '2024-07-01', 'media', 'VSCX8DXY8A0K40Y7Y9E7KQAXA', '2024-07-13', '2024-06-23'), 
('4460178', 'ad2538e', 'AT5RQOV1PV', 'Inca Kola-can 350mlx24', 'SE-5-7', 'SE-6-9', 'error', '2024-07-06', 'media', 'GQ9DCUJL01DAU1SM53UE9ZH5U', '2024-06-27', '2024-07-13');

INSERT INTO users (id, dni, user, password, name_user, last_name_user, permission, created_at, updated_at) VALUES 
('bc4ab3e', '24076465', 'jlflzqsg', 'ZVQq8s0RZPBd', 'John', 'Smith', 'administrador', '2024-07-14', '2024-07-17'), 
('b8f87ac', '18769185', 'ywhwbkhm', 'tRGiN5p4OvXy', 'Jane', 'Brown', 'usuario', '2024-07-16', '2024-06-24'), 
('794a373', '66466869', 'gqfahtsh', 'hrFh4D4U9SFG', 'Bob', 'Williams', 'usuario', '2024-07-08', '2024-06-30'), 
('e4c1def', '18218525', 'qkqdfvwe', 'IlGRF3XoqshP', 'Alice', 'Jones', 'administrador', '2024-07-02', '2024-07-14'), 
('f562f89', '87320687', 'yiwnrryc', 'bYNW02OQsKia', 'John', 'Smith', 'administrador', '2024-07-14', '2024-06-20'), 
('5ce330b', '30823360', 'txgydyfl', 'DSXFEfOBMBGj', 'Jane', 'Williams', 'usuario', '2024-06-30', '2024-07-05'), 
('c90ec9c', '60763210', 'qvcxivul', 'dy6CMyhXQp2P', 'Alice', 'Brown', 'usuario', '2024-07-12', '2024-06-23'), 
('79c865d', '72067116', 'funtxqpj', 'oC02cQGKe5Of', 'Jane', 'Smith', 'administrador', '2024-07-05', '2024-07-17'), 
('dc9c9bd', '28648598', 'ayjszzsl', '1RDpYr3DbjxT', 'Alice', 'Williams', 'usuario', '2024-06-22', '2024-07-10'), 
('188bc83', '82224563', 'fypjpsik', '5glNbuWSRFFz', 'Eve', 'Johnson', 'administrador', '2024-07-04', '2024-06-24'), 
('f0b42d5', '21457016', 'bfpapnfg', 'gN00EhSmVDj3', 'Bob', 'Johnson', 'administrador', '2024-07-12', '2024-07-15'), 
('39c58a8', '40069646', 'haklxddu', 'giWY158gcpFt', 'Jane', 'Jones', 'usuario', '2024-07-02', '2024-06-20'), 
('7c55f38', '67266728', 'dvmfgipk', 'kNoaTfBYykBY', 'Jane', 'Johnson', 'usuario', '2024-07-02', '2024-07-13'), 
('a732ce1', '09189193', 'nyceugjy', '5FebDICCNqJc', 'Jane', 'Jones', 'administrador', '2024-07-06', '2024-07-08'), 
('363f8e8', '77684087', 'radcyqlm', '8R41Nsvc2gIQ', 'Eve', 'Jones', 'administrador', '2024-07-13', '2024-07-16');

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

INSERT INTO productivity (id_user, id_product, created_at) VALUES 
('bc4ab3e', '362c547', '2024-07-09'), 
('b8f87ac', '0288b7f', '2024-06-30'), 
('794a373', '84d49c1', '2024-06-26'), 
('e4c1def', '88da533', '2024-07-04'), 
('f562f89', 'cf27352', '2024-07-13'), 
('5ce330b', 'c25acc2', '2024-07-05'), 
('c90ec9c', 'b6ea56e', '2024-06-28'), 
('79c865d', '4d3c0c8', '2024-07-14'), 
('dc9c9bd', 'd05b364', '2024-07-17'), 
('188bc83', 'c00c04d', '2024-06-23'), 
('f0b42d5', 'a867fa4', '2024-07-15'), 
('39c58a8', '05d5d2d', '2024-06-28'), 
('7c55f38', '41ae07f', '2024-07-14'), 
('a732ce1', '3167876', '2024-07-06'), 
('363f8e8', '4460178', '2024-06-28');
