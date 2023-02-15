export interface Data {
  items: Item[];
}

export interface Item {
  id: string;
  type: string;
  name: string;
  ppu: number;
  financials: Financials;
  batters: Topping[];
  toppings: Topping[];
}

export interface Financials {
  price: Price;
}

export interface Price {
  gross: number;
  net: number;
}

export interface Topping {
  id: string;
  type: string;
}

export const data: Data = {
  items: [
    {
      id: '0001',
      type: 'donut',
      name: 'Cake',
      ppu: 0.55,
      financials: {
        price: {
          gross: 120,
          net: 100
        }
      },
      batters:
        [
          { id: '1001', type: 'Regular' },
          { id: '1002', type: 'Chocolate' },
          { id: '1003', type: 'Blueberry' },
          { id: '1004', type: 'Devil\'s Food' }
        ],
      toppings:
        [
          { id: '5001', type: 'None' },
          { id: '5002', type: 'Glazed' },
          { id: '5005', type: 'Sugar' },
          { id: '5007', type: 'Powdered Sugar' },
          { id: '5006', type: 'Chocolate with Sprinkles' },
          { id: '5003', type: 'Chocolate' },
          { id: '5004', type: 'Maple' }
        ]
    }
  ]
}
