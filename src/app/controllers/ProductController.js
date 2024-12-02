import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // Verifica se o usuário tem permissão de admin
    const { admin: isAdmin } = await User.findByPk(request.userId);
    if (!isAdmin) {
      return response.status(401).json();
    }

    // Verifica se o arquivo foi enviado no request
    if (!request.file) {
      return response.status(400).json({ error: 'File is required' });
    }

    // A URL pública do arquivo que foi carregado para o S3
    const { location: path } = request.file; // location vem do multer-s3

    const {
      name, description, price, category_id, offer,
    } = request.body;

    // Criação do produto e salvando a URL no banco de dados
    const product = await Product.create({
      name,
      description,
      price,
      category_id,
      path,  // Salvando o caminho do S3 no banco de dados
      offer,
    });

    return response.status(201).json(product);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      description: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);
    if (!isAdmin) {
      return response.status(401).json();
    }
    const { id } = request.params;

    const findProduct = await Product.findByPk(id);
    if (!findProduct) {
      return response.status(400).json({ error: 'Make sure your product ID is correct' });
    }

    let path;
    if (request.file) {
      path = request.file.location;  // Aqui você pega a URL do S3
    }

    const {
      name, description, price, category_id, offer,
    } = request.body;

    // Atualizando o produto com a nova URL se houver
    await Product.update({
      name,
      description,
      price,
      category_id,
      path,
      offer,
    }, {
      where: {
        id,
      },
    });

    return response.status(200).json();
  }

  async index(request, response) {
    const products = await Product.findAll({
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      }],
    });

    return response.json(products);
  }
}

export default new ProductController();
