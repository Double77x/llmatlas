import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ToolCard from '@/components/ToolCard';
import { Tool } from '@/lib/supabase';

// Mock the useVote hook
vi.mock('@/hooks/useVote', () => ({
  useVote: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

const mockTool: Tool = {
  id: 'test-tool',
  name: 'Test Tool',
  description: 'A test tool description',
  url: 'https://test.com',
  github: 'https://github.com/test',
  pricing: 'Free',
  tags: ['tag1', 'tag2'],
  types: ['CLI'],
  vote_count: 10,
  created_at: new Date().toISOString(),
};

describe('ToolCard', () => {
  it('renders tool information correctly', () => {
    render(<ToolCard tool={mockTool} initialHasVoted={false} />);
    
    expect(screen.getByText('Test Tool')).toBeInTheDocument();
    expect(screen.getByText('A test tool description')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('VOTES')).toBeInTheDocument();
    expect(screen.getByText('VISIT')).toBeInTheDocument();
    expect(screen.getByText('SOURCE')).toBeInTheDocument();
  });

  it('displays tags and types', () => {
    render(<ToolCard tool={mockTool} initialHasVoted={false} />);
    
    expect(screen.getByText('CLI')).toBeInTheDocument();
    expect(screen.getByText(/tag1/i)).toBeInTheDocument();
    expect(screen.getByText(/tag2/i)).toBeInTheDocument();
  });
});
