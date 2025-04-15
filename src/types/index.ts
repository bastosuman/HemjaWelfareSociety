export interface NavItem {
    title: string;
    path: string;
    children?: NavItem[];
    icon?: React.ReactNode;
    isExternal?: boolean;
}

export interface HeaderProps {
    logo: string;
    organizationName: string;
    isSticky?: boolean;
    onMenuToggle?: () => void;
    className?: string;
}

export interface NavigationProps {
    items: NavItem[];
    className?: string;
    orientation?: 'horizontal' | 'vertical';
}

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactNode;
}

export interface SectionProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    background?: 'light' | 'dark' | 'primary';
}

export interface CardProps {
    title?: string;
    image?: string;
    description?: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export interface FooterProps {
    logo?: string;
    socialLinks?: Array<{
        platform: string;
        url: string;
        icon?: React.ReactNode;
    }>;
    className?: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}