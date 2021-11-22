import { Apollo, ApolloBase } from 'apollo-angular';
import 'jest-preset-angular/setup-jest';
import { fixApolloBase } from './workaround';
fixApolloBase(Apollo, ApolloBase);
