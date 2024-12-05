'use strict';

customElements.define(
  'compodoc-menu',
  class extends HTMLElement {
    constructor() {
      super();
      this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
      this.render(this.isNormalMode);
    }

    render(isNormalMode) {
      let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link"> documentation</a>
                </li>

                <li class="divider"></li>
                ${
                  isNormalMode
                    ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>`
                    : ''
                }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#modules-links"'
                                : 'data-bs-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="modules-links"'
                            : 'id="xs-modules-links"'
                        }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-AppModule-b438ce0c2a66af1812cb06f7c8a11efc9d6e59fa456597d1ac9bf23ab29fc1719a0ae4e24dc0a2235fa3ff4f72ad4923343e6db06334fd9997b2cabb36d4422c"'
                                            : 'data-bs-target="#xs-controllers-links-module-AppModule-b438ce0c2a66af1812cb06f7c8a11efc9d6e59fa456597d1ac9bf23ab29fc1719a0ae4e24dc0a2235fa3ff4f72ad4923343e6db06334fd9997b2cabb36d4422c"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-AppModule-b438ce0c2a66af1812cb06f7c8a11efc9d6e59fa456597d1ac9bf23ab29fc1719a0ae4e24dc0a2235fa3ff4f72ad4923343e6db06334fd9997b2cabb36d4422c"'
                                            : 'id="xs-controllers-links-module-AppModule-b438ce0c2a66af1812cb06f7c8a11efc9d6e59fa456597d1ac9bf23ab29fc1719a0ae4e24dc0a2235fa3ff4f72ad4923343e6db06334fd9997b2cabb36d4422c"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-AppModule-b438ce0c2a66af1812cb06f7c8a11efc9d6e59fa456597d1ac9bf23ab29fc1719a0ae4e24dc0a2235fa3ff4f72ad4923343e6db06334fd9997b2cabb36d4422c"'
                                        : 'data-bs-target="#xs-injectables-links-module-AppModule-b438ce0c2a66af1812cb06f7c8a11efc9d6e59fa456597d1ac9bf23ab29fc1719a0ae4e24dc0a2235fa3ff4f72ad4923343e6db06334fd9997b2cabb36d4422c"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-AppModule-b438ce0c2a66af1812cb06f7c8a11efc9d6e59fa456597d1ac9bf23ab29fc1719a0ae4e24dc0a2235fa3ff4f72ad4923343e6db06334fd9997b2cabb36d4422c"'
                                        : 'id="xs-injectables-links-module-AppModule-b438ce0c2a66af1812cb06f7c8a11efc9d6e59fa456597d1ac9bf23ab29fc1719a0ae4e24dc0a2235fa3ff4f72ad4923343e6db06334fd9997b2cabb36d4422c"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-AuthModule-4ce7b2d2209419da031c78899600d30f92ade625af525dce76fb9f03eb571b932642b1b583da3b401af2d76e106f9eed6d5f93140d75d74dc4a164f8b0c60e15"'
                                            : 'data-bs-target="#xs-controllers-links-module-AuthModule-4ce7b2d2209419da031c78899600d30f92ade625af525dce76fb9f03eb571b932642b1b583da3b401af2d76e106f9eed6d5f93140d75d74dc4a164f8b0c60e15"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-AuthModule-4ce7b2d2209419da031c78899600d30f92ade625af525dce76fb9f03eb571b932642b1b583da3b401af2d76e106f9eed6d5f93140d75d74dc4a164f8b0c60e15"'
                                            : 'id="xs-controllers-links-module-AuthModule-4ce7b2d2209419da031c78899600d30f92ade625af525dce76fb9f03eb571b932642b1b583da3b401af2d76e106f9eed6d5f93140d75d74dc4a164f8b0c60e15"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-AuthModule-4ce7b2d2209419da031c78899600d30f92ade625af525dce76fb9f03eb571b932642b1b583da3b401af2d76e106f9eed6d5f93140d75d74dc4a164f8b0c60e15"'
                                        : 'data-bs-target="#xs-injectables-links-module-AuthModule-4ce7b2d2209419da031c78899600d30f92ade625af525dce76fb9f03eb571b932642b1b583da3b401af2d76e106f9eed6d5f93140d75d74dc4a164f8b0c60e15"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-AuthModule-4ce7b2d2209419da031c78899600d30f92ade625af525dce76fb9f03eb571b932642b1b583da3b401af2d76e106f9eed6d5f93140d75d74dc4a164f8b0c60e15"'
                                        : 'id="xs-injectables-links-module-AuthModule-4ce7b2d2209419da031c78899600d30f92ade625af525dce76fb9f03eb571b932642b1b583da3b401af2d76e106f9eed6d5f93140d75d74dc4a164f8b0c60e15"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-CompaniesModule-a90a238c9fb25a25b0063ea0d32e7594878ecc90d5939979d42465d2fa7ee1cc6c2c1555b610a3a1065b94c5d10d34b885bdfc12165b5392e0dea50fe9007c6c"'
                                            : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-a90a238c9fb25a25b0063ea0d32e7594878ecc90d5939979d42465d2fa7ee1cc6c2c1555b610a3a1065b94c5d10d34b885bdfc12165b5392e0dea50fe9007c6c"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-CompaniesModule-a90a238c9fb25a25b0063ea0d32e7594878ecc90d5939979d42465d2fa7ee1cc6c2c1555b610a3a1065b94c5d10d34b885bdfc12165b5392e0dea50fe9007c6c"'
                                            : 'id="xs-controllers-links-module-CompaniesModule-a90a238c9fb25a25b0063ea0d32e7594878ecc90d5939979d42465d2fa7ee1cc6c2c1555b610a3a1065b94c5d10d34b885bdfc12165b5392e0dea50fe9007c6c"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-CompaniesModule-a90a238c9fb25a25b0063ea0d32e7594878ecc90d5939979d42465d2fa7ee1cc6c2c1555b610a3a1065b94c5d10d34b885bdfc12165b5392e0dea50fe9007c6c"'
                                        : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-a90a238c9fb25a25b0063ea0d32e7594878ecc90d5939979d42465d2fa7ee1cc6c2c1555b610a3a1065b94c5d10d34b885bdfc12165b5392e0dea50fe9007c6c"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-CompaniesModule-a90a238c9fb25a25b0063ea0d32e7594878ecc90d5939979d42465d2fa7ee1cc6c2c1555b610a3a1065b94c5d10d34b885bdfc12165b5392e0dea50fe9007c6c"'
                                        : 'id="xs-injectables-links-module-CompaniesModule-a90a238c9fb25a25b0063ea0d32e7594878ecc90d5939979d42465d2fa7ee1cc6c2c1555b610a3a1065b94c5d10d34b885bdfc12165b5392e0dea50fe9007c6c"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-DatabasesModule-0d35987fb058b6e37d21ee3bde7411b07576f91090de39951c454f7883792aeed68afa94e9ba7379df6d1f1f7abc6f5482b5048026a3db11b2ce8277da7e5302"'
                                            : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-0d35987fb058b6e37d21ee3bde7411b07576f91090de39951c454f7883792aeed68afa94e9ba7379df6d1f1f7abc6f5482b5048026a3db11b2ce8277da7e5302"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-DatabasesModule-0d35987fb058b6e37d21ee3bde7411b07576f91090de39951c454f7883792aeed68afa94e9ba7379df6d1f1f7abc6f5482b5048026a3db11b2ce8277da7e5302"'
                                            : 'id="xs-controllers-links-module-DatabasesModule-0d35987fb058b6e37d21ee3bde7411b07576f91090de39951c454f7883792aeed68afa94e9ba7379df6d1f1f7abc6f5482b5048026a3db11b2ce8277da7e5302"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-DatabasesModule-0d35987fb058b6e37d21ee3bde7411b07576f91090de39951c454f7883792aeed68afa94e9ba7379df6d1f1f7abc6f5482b5048026a3db11b2ce8277da7e5302"'
                                        : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-0d35987fb058b6e37d21ee3bde7411b07576f91090de39951c454f7883792aeed68afa94e9ba7379df6d1f1f7abc6f5482b5048026a3db11b2ce8277da7e5302"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-DatabasesModule-0d35987fb058b6e37d21ee3bde7411b07576f91090de39951c454f7883792aeed68afa94e9ba7379df6d1f1f7abc6f5482b5048026a3db11b2ce8277da7e5302"'
                                        : 'id="xs-injectables-links-module-DatabasesModule-0d35987fb058b6e37d21ee3bde7411b07576f91090de39951c454f7883792aeed68afa94e9ba7379df6d1f1f7abc6f5482b5048026a3db11b2ce8277da7e5302"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-FilesModule-072a4b99ae6ff3f00abf85c7e43071be8dccbccf3a117d8c83d7157222ed165590400e530e46384602ac3e3d383d178704871ae67d300c0822df6b47c4ff5f89"'
                                            : 'data-bs-target="#xs-controllers-links-module-FilesModule-072a4b99ae6ff3f00abf85c7e43071be8dccbccf3a117d8c83d7157222ed165590400e530e46384602ac3e3d383d178704871ae67d300c0822df6b47c4ff5f89"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-FilesModule-072a4b99ae6ff3f00abf85c7e43071be8dccbccf3a117d8c83d7157222ed165590400e530e46384602ac3e3d383d178704871ae67d300c0822df6b47c4ff5f89"'
                                            : 'id="xs-controllers-links-module-FilesModule-072a4b99ae6ff3f00abf85c7e43071be8dccbccf3a117d8c83d7157222ed165590400e530e46384602ac3e3d383d178704871ae67d300c0822df6b47c4ff5f89"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-FilesModule-072a4b99ae6ff3f00abf85c7e43071be8dccbccf3a117d8c83d7157222ed165590400e530e46384602ac3e3d383d178704871ae67d300c0822df6b47c4ff5f89"'
                                        : 'data-bs-target="#xs-injectables-links-module-FilesModule-072a4b99ae6ff3f00abf85c7e43071be8dccbccf3a117d8c83d7157222ed165590400e530e46384602ac3e3d383d178704871ae67d300c0822df6b47c4ff5f89"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-FilesModule-072a4b99ae6ff3f00abf85c7e43071be8dccbccf3a117d8c83d7157222ed165590400e530e46384602ac3e3d383d178704871ae67d300c0822df6b47c4ff5f89"'
                                        : 'id="xs-injectables-links-module-FilesModule-072a4b99ae6ff3f00abf85c7e43071be8dccbccf3a117d8c83d7157222ed165590400e530e46384602ac3e3d383d178704871ae67d300c0822df6b47c4ff5f89"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"'
                                            : 'data-bs-target="#xs-controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"'
                                            : 'id="xs-controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-JobsModule-e1d44dd2bc553ca95869bafbe30fa9da35b303469654e40fec8406a7d1db5788f96d0030a037f4e0e86e2975fa21c7429bee87d9e412b93a55d86019eb14b26a"'
                                            : 'data-bs-target="#xs-controllers-links-module-JobsModule-e1d44dd2bc553ca95869bafbe30fa9da35b303469654e40fec8406a7d1db5788f96d0030a037f4e0e86e2975fa21c7429bee87d9e412b93a55d86019eb14b26a"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-JobsModule-e1d44dd2bc553ca95869bafbe30fa9da35b303469654e40fec8406a7d1db5788f96d0030a037f4e0e86e2975fa21c7429bee87d9e412b93a55d86019eb14b26a"'
                                            : 'id="xs-controllers-links-module-JobsModule-e1d44dd2bc553ca95869bafbe30fa9da35b303469654e40fec8406a7d1db5788f96d0030a037f4e0e86e2975fa21c7429bee87d9e412b93a55d86019eb14b26a"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-JobsModule-e1d44dd2bc553ca95869bafbe30fa9da35b303469654e40fec8406a7d1db5788f96d0030a037f4e0e86e2975fa21c7429bee87d9e412b93a55d86019eb14b26a"'
                                        : 'data-bs-target="#xs-injectables-links-module-JobsModule-e1d44dd2bc553ca95869bafbe30fa9da35b303469654e40fec8406a7d1db5788f96d0030a037f4e0e86e2975fa21c7429bee87d9e412b93a55d86019eb14b26a"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-JobsModule-e1d44dd2bc553ca95869bafbe30fa9da35b303469654e40fec8406a7d1db5788f96d0030a037f4e0e86e2975fa21c7429bee87d9e412b93a55d86019eb14b26a"'
                                        : 'id="xs-injectables-links-module-JobsModule-e1d44dd2bc553ca95869bafbe30fa9da35b303469654e40fec8406a7d1db5788f96d0030a037f4e0e86e2975fa21c7429bee87d9e412b93a55d86019eb14b26a"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-MailModule-8f8cee5f541b8601852cd6d6d89a479f18280df8735dc0d94dea70adc53902ee7ee96090cb77d1cb1c9f5a1daa8357113bd027c70c4dcf5d76ad55ff479040f6"'
                                            : 'data-bs-target="#xs-controllers-links-module-MailModule-8f8cee5f541b8601852cd6d6d89a479f18280df8735dc0d94dea70adc53902ee7ee96090cb77d1cb1c9f5a1daa8357113bd027c70c4dcf5d76ad55ff479040f6"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-MailModule-8f8cee5f541b8601852cd6d6d89a479f18280df8735dc0d94dea70adc53902ee7ee96090cb77d1cb1c9f5a1daa8357113bd027c70c4dcf5d76ad55ff479040f6"'
                                            : 'id="xs-controllers-links-module-MailModule-8f8cee5f541b8601852cd6d6d89a479f18280df8735dc0d94dea70adc53902ee7ee96090cb77d1cb1c9f5a1daa8357113bd027c70c4dcf5d76ad55ff479040f6"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-MailModule-8f8cee5f541b8601852cd6d6d89a479f18280df8735dc0d94dea70adc53902ee7ee96090cb77d1cb1c9f5a1daa8357113bd027c70c4dcf5d76ad55ff479040f6"'
                                        : 'data-bs-target="#xs-injectables-links-module-MailModule-8f8cee5f541b8601852cd6d6d89a479f18280df8735dc0d94dea70adc53902ee7ee96090cb77d1cb1c9f5a1daa8357113bd027c70c4dcf5d76ad55ff479040f6"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-MailModule-8f8cee5f541b8601852cd6d6d89a479f18280df8735dc0d94dea70adc53902ee7ee96090cb77d1cb1c9f5a1daa8357113bd027c70c4dcf5d76ad55ff479040f6"'
                                        : 'id="xs-injectables-links-module-MailModule-8f8cee5f541b8601852cd6d6d89a479f18280df8735dc0d94dea70adc53902ee7ee96090cb77d1cb1c9f5a1daa8357113bd027c70c4dcf5d76ad55ff479040f6"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-PermissionsModule-641f99452045437093d87e96ced663b8ff30c674135db051f00f9038613fb6880630a76888024a834019d1f9ea85e579002cb6aaf2354f71fee9ff793b4395bb"'
                                            : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-641f99452045437093d87e96ced663b8ff30c674135db051f00f9038613fb6880630a76888024a834019d1f9ea85e579002cb6aaf2354f71fee9ff793b4395bb"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-PermissionsModule-641f99452045437093d87e96ced663b8ff30c674135db051f00f9038613fb6880630a76888024a834019d1f9ea85e579002cb6aaf2354f71fee9ff793b4395bb"'
                                            : 'id="xs-controllers-links-module-PermissionsModule-641f99452045437093d87e96ced663b8ff30c674135db051f00f9038613fb6880630a76888024a834019d1f9ea85e579002cb6aaf2354f71fee9ff793b4395bb"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-PermissionsModule-641f99452045437093d87e96ced663b8ff30c674135db051f00f9038613fb6880630a76888024a834019d1f9ea85e579002cb6aaf2354f71fee9ff793b4395bb"'
                                        : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-641f99452045437093d87e96ced663b8ff30c674135db051f00f9038613fb6880630a76888024a834019d1f9ea85e579002cb6aaf2354f71fee9ff793b4395bb"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-PermissionsModule-641f99452045437093d87e96ced663b8ff30c674135db051f00f9038613fb6880630a76888024a834019d1f9ea85e579002cb6aaf2354f71fee9ff793b4395bb"'
                                        : 'id="xs-injectables-links-module-PermissionsModule-641f99452045437093d87e96ced663b8ff30c674135db051f00f9038613fb6880630a76888024a834019d1f9ea85e579002cb6aaf2354f71fee9ff793b4395bb"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-ResumesModule-568eb8735e5e29a49d087e3e8e6ce031e191edda741ec36c6d1ef278952476ac183b6e8a004c6087a047b2bcdacb9e7e1a4a230491e228fbc91e102dc3e953cf"'
                                            : 'data-bs-target="#xs-controllers-links-module-ResumesModule-568eb8735e5e29a49d087e3e8e6ce031e191edda741ec36c6d1ef278952476ac183b6e8a004c6087a047b2bcdacb9e7e1a4a230491e228fbc91e102dc3e953cf"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-ResumesModule-568eb8735e5e29a49d087e3e8e6ce031e191edda741ec36c6d1ef278952476ac183b6e8a004c6087a047b2bcdacb9e7e1a4a230491e228fbc91e102dc3e953cf"'
                                            : 'id="xs-controllers-links-module-ResumesModule-568eb8735e5e29a49d087e3e8e6ce031e191edda741ec36c6d1ef278952476ac183b6e8a004c6087a047b2bcdacb9e7e1a4a230491e228fbc91e102dc3e953cf"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-ResumesModule-568eb8735e5e29a49d087e3e8e6ce031e191edda741ec36c6d1ef278952476ac183b6e8a004c6087a047b2bcdacb9e7e1a4a230491e228fbc91e102dc3e953cf"'
                                        : 'data-bs-target="#xs-injectables-links-module-ResumesModule-568eb8735e5e29a49d087e3e8e6ce031e191edda741ec36c6d1ef278952476ac183b6e8a004c6087a047b2bcdacb9e7e1a4a230491e228fbc91e102dc3e953cf"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-ResumesModule-568eb8735e5e29a49d087e3e8e6ce031e191edda741ec36c6d1ef278952476ac183b6e8a004c6087a047b2bcdacb9e7e1a4a230491e228fbc91e102dc3e953cf"'
                                        : 'id="xs-injectables-links-module-ResumesModule-568eb8735e5e29a49d087e3e8e6ce031e191edda741ec36c6d1ef278952476ac183b6e8a004c6087a047b2bcdacb9e7e1a4a230491e228fbc91e102dc3e953cf"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-RolesModule-0839291a1dadf9bc1ac3ff1bbf91bc99577b75e3248823f3da0493bf21ea7668caf2a2ec54c13c2c295f85e6f3d73c587450284567d1e3e380a797bac742da62"'
                                            : 'data-bs-target="#xs-controllers-links-module-RolesModule-0839291a1dadf9bc1ac3ff1bbf91bc99577b75e3248823f3da0493bf21ea7668caf2a2ec54c13c2c295f85e6f3d73c587450284567d1e3e380a797bac742da62"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-RolesModule-0839291a1dadf9bc1ac3ff1bbf91bc99577b75e3248823f3da0493bf21ea7668caf2a2ec54c13c2c295f85e6f3d73c587450284567d1e3e380a797bac742da62"'
                                            : 'id="xs-controllers-links-module-RolesModule-0839291a1dadf9bc1ac3ff1bbf91bc99577b75e3248823f3da0493bf21ea7668caf2a2ec54c13c2c295f85e6f3d73c587450284567d1e3e380a797bac742da62"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-RolesModule-0839291a1dadf9bc1ac3ff1bbf91bc99577b75e3248823f3da0493bf21ea7668caf2a2ec54c13c2c295f85e6f3d73c587450284567d1e3e380a797bac742da62"'
                                        : 'data-bs-target="#xs-injectables-links-module-RolesModule-0839291a1dadf9bc1ac3ff1bbf91bc99577b75e3248823f3da0493bf21ea7668caf2a2ec54c13c2c295f85e6f3d73c587450284567d1e3e380a797bac742da62"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-RolesModule-0839291a1dadf9bc1ac3ff1bbf91bc99577b75e3248823f3da0493bf21ea7668caf2a2ec54c13c2c295f85e6f3d73c587450284567d1e3e380a797bac742da62"'
                                        : 'id="xs-injectables-links-module-RolesModule-0839291a1dadf9bc1ac3ff1bbf91bc99577b75e3248823f3da0493bf21ea7668caf2a2ec54c13c2c295f85e6f3d73c587450284567d1e3e380a797bac742da62"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-SubscribersModule-3cc601a80b806d7679eed99cfd5c3b58169652a6ed17c14c12c87f09f9cb9e77996f265c6432ad5c7a25b863d931e8e2b8d3c0be464ee9644686d1c72dc6d334"'
                                            : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-3cc601a80b806d7679eed99cfd5c3b58169652a6ed17c14c12c87f09f9cb9e77996f265c6432ad5c7a25b863d931e8e2b8d3c0be464ee9644686d1c72dc6d334"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-SubscribersModule-3cc601a80b806d7679eed99cfd5c3b58169652a6ed17c14c12c87f09f9cb9e77996f265c6432ad5c7a25b863d931e8e2b8d3c0be464ee9644686d1c72dc6d334"'
                                            : 'id="xs-controllers-links-module-SubscribersModule-3cc601a80b806d7679eed99cfd5c3b58169652a6ed17c14c12c87f09f9cb9e77996f265c6432ad5c7a25b863d931e8e2b8d3c0be464ee9644686d1c72dc6d334"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-SubscribersModule-3cc601a80b806d7679eed99cfd5c3b58169652a6ed17c14c12c87f09f9cb9e77996f265c6432ad5c7a25b863d931e8e2b8d3c0be464ee9644686d1c72dc6d334"'
                                        : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-3cc601a80b806d7679eed99cfd5c3b58169652a6ed17c14c12c87f09f9cb9e77996f265c6432ad5c7a25b863d931e8e2b8d3c0be464ee9644686d1c72dc6d334"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-SubscribersModule-3cc601a80b806d7679eed99cfd5c3b58169652a6ed17c14c12c87f09f9cb9e77996f265c6432ad5c7a25b863d931e8e2b8d3c0be464ee9644686d1c72dc6d334"'
                                        : 'id="xs-injectables-links-module-SubscribersModule-3cc601a80b806d7679eed99cfd5c3b58169652a6ed17c14c12c87f09f9cb9e77996f265c6432ad5c7a25b863d931e8e2b8d3c0be464ee9644686d1c72dc6d334"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-UsersModule-70b1ba97ff2d9d2a8ee1c9bb33dc9859ce0c6a7424ffc74d1b79951ae59f09d8b20c5cdec9561f4544c588e3ccc4da7ab1a2fe9de71c06db6f3ecf2cefe91c6c"'
                                            : 'data-bs-target="#xs-controllers-links-module-UsersModule-70b1ba97ff2d9d2a8ee1c9bb33dc9859ce0c6a7424ffc74d1b79951ae59f09d8b20c5cdec9561f4544c588e3ccc4da7ab1a2fe9de71c06db6f3ecf2cefe91c6c"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-UsersModule-70b1ba97ff2d9d2a8ee1c9bb33dc9859ce0c6a7424ffc74d1b79951ae59f09d8b20c5cdec9561f4544c588e3ccc4da7ab1a2fe9de71c06db6f3ecf2cefe91c6c"'
                                            : 'id="xs-controllers-links-module-UsersModule-70b1ba97ff2d9d2a8ee1c9bb33dc9859ce0c6a7424ffc74d1b79951ae59f09d8b20c5cdec9561f4544c588e3ccc4da7ab1a2fe9de71c06db6f3ecf2cefe91c6c"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-UsersModule-70b1ba97ff2d9d2a8ee1c9bb33dc9859ce0c6a7424ffc74d1b79951ae59f09d8b20c5cdec9561f4544c588e3ccc4da7ab1a2fe9de71c06db6f3ecf2cefe91c6c"'
                                        : 'data-bs-target="#xs-injectables-links-module-UsersModule-70b1ba97ff2d9d2a8ee1c9bb33dc9859ce0c6a7424ffc74d1b79951ae59f09d8b20c5cdec9561f4544c588e3ccc4da7ab1a2fe9de71c06db6f3ecf2cefe91c6c"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-UsersModule-70b1ba97ff2d9d2a8ee1c9bb33dc9859ce0c6a7424ffc74d1b79951ae59f09d8b20c5cdec9561f4544c588e3ccc4da7ab1a2fe9de71c06db6f3ecf2cefe91c6c"'
                                        : 'id="xs-injectables-links-module-UsersModule-70b1ba97ff2d9d2a8ee1c9bb33dc9859ce0c6a7424ffc74d1b79951ae59f09d8b20c5cdec9561f4544c588e3ccc4da7ab1a2fe9de71c06db6f3ecf2cefe91c6c"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#controllers-links"'
                                : 'data-bs-target="#xs-controllers-links"'
                            }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${
                              isNormalMode
                                ? 'id="controllers-links"'
                                : 'id="xs-controllers-links"'
                            }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#classes-links"'
                            : 'data-bs-target="#xs-classes-links"'
                        }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="classes-links"'
                            : 'id="xs-classes-links"'
                        }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCVDto.html" data-type="entity-link" >CreateCVDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#injectables-links"'
                                : 'data-bs-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${
                              isNormalMode
                                ? 'id="injectables-links"'
                                : 'id="xs-injectables-links"'
                            }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#interfaces-links"'
                            : 'data-bs-target="#xs-interfaces-links"'
                        }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? ' id="interfaces-links"'
                            : 'id="xs-interfaces-links"'
                        }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="miscellaneous-links"'
                            : 'id="xs-miscellaneous-links"'
                        }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
      this.innerHTML = tp.strings;
    }
  },
);
