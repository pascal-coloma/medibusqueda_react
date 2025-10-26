import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardMedicamento from '../components/CardMedicamento';

describe('CardMedicamento', () => {
  it('debería renderizar la información del producto correctamente en la card', () => {
    const mockProducto = {
      nombreMedicamento: 'Paracetamol 500mg',
      laboratorio: 'Laboratorio Genérico',
      principioActivo1: 'Paracetamol',
      presentacion: 'Caja con 20 comprimidos',
      accionTerapeutica: 'Analgésico y antipirético',
      ofertaFonasa: 1590,
    };

    render(<CardMedicamento producto={mockProducto} />);


    expect(screen.getByText(mockProducto.nombreMedicamento)).toBeInTheDocument();

    expect(screen.getByText(mockProducto.laboratorio)).toBeInTheDocument();

    expect(screen.getByText(mockProducto.principioActivo1)).toBeInTheDocument();

    expect(screen.getByText(mockProducto.presentacion)).toBeInTheDocument();

    expect(screen.getByText(`$${Math.round(mockProducto.ofertaFonasa)}`)).toBeInTheDocument();
  });
});
