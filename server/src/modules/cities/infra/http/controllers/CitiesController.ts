import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCityService from '@modules/cities/services/CreateCityService';
import UpdateCityService from '@modules/cities/services/UpdateCityService';
import ListAllCitiesService from '@modules/cities/services/ListAllCitiesService';
import CityDetailsService from '@modules/cities/services/CityDetailsService';

export default class CitiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCityService = container.resolve(CreateCityService);

    const cityData = request.body;

    const city = await createCityService.execute(cityData);

    return response.json(city);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCityService = container.resolve(UpdateCityService);

    const { id } = request.params;
    const cityData = request.body;

    const city = await updateCityService.execute({ id, ...cityData });

    return response.json(city);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllCitiesService = container.resolve(ListAllCitiesService);

    const cities = await listAllCitiesService.execute();

    return response.json(cities);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const cityDetailsService = container.resolve(CityDetailsService);

    const city = await cityDetailsService.execute(id);

    return response.json(city);
  }
}
