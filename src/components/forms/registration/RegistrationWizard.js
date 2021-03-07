import { useAuthentication } from "@components/AuthenticationProvider";
import { register } from "@lib/client/AdherentsApiClient";
import { SiretSearchForm } from "./SiretSearch";
import Wizard from "@forms/Wizard";

export const steps = [
	{
		id: "step-intro",
		title: "Adhésion en ligne",
		help: {
			description: `
Invie est une association qui œuvre pour la structuration de la filière des services à la personne 
sur le territoire depuis plusieurs années. 
Notre mission est d’accompagner et innover dans l’aide à la personne 
en favorisant les échanges de pratiques professionnelles, 
le partage des connaissances des acteurs du secteur de l’aide 
et des services à la personne, dans un objectif de développement, 
de structuration et de modernisation.

Deux modalités de cotisation sont possibles :
* Cotisation A : 200€ par an pour les SAP/SAAD donnant accès à toute l’offre de services
* Cotisation B : 60€ pour les partenaires du secteur social, médicosocial et sanitaire
  (ESMS hors SAAD/EHPAD et Résidences autonomie, fédérations de branche, OPCO, adherents de formations)
  Contactez INVIE sur contact@invie78.fr – 01.39.29.43.48
`,
			backgroundImage: "https://invie78.fr/images/background-registration.jpg"
		}
	},
	{
		id: "step-documents-necessaires",
		title: "Informations nécessaires",
		help: {
			description: `
Afin de compléter ce processus d’adhésion, vous aurez besoin des éléments suivants :
* Nombre de salariés personnes physiques et ETP
* Nombre d’intervenants personnes physiques et ETP
* Nombre de cadres intermédiaires personnes physiques et ETP
* Volume d’heures APA/PCH/prestations de confort
* Chiffre d’affaires
* Bénéficiaires APA/PCH/garde d’enfants/confort
* Ratios bénéficiaires APA/PCH/transport adapté/garde d’enfant/Part mandataire et prestataire/activités de confort
`,
			backgroundImage: "https://invie78.fr/images/background-registration.jpg"
		}
	},
	{
		id: "step-01-siret-search",
		title: "Recherche de l'adherent par son N° de SIRET",
		description: "Entrez le n° de Siret et cliquez sur Rechercher",
		displayForm: (data, onSubmit) => <SiretSearchForm onSubmit={onSubmit} />
	},
	{
		id: "step-02-siret",
		title: "Organisme",
		help: {
			description: `Vérifiez l'adresse, le nom et la date de création de la structure à déclarer.`,
			backgroundImage: "https://invie78.fr/images/background-nouvel-adherent.jpg"
		},
		fields: [
			{
				name: "siret",
				label: "No de Siret",
				type: "siret",
				readOnly: true
			},
			{
				name: "nom",
				label: "Nom",
				required: "Saisissez le nom de votre structure"
			},
			{
				name: "date_creation",
				label: "Création",
				type: "date",
				size: 1 / 4,
				required: "Saisissez la date de création de l'entreprise"
			},
			{
				name: "forme_juridique",
				label: "Forme juridique",
				type: "select",
				options: [
					{ code: "association", label: "Association" },
					{ code: "entreprise", label: "Entreprise" },
					{ code: "ccas-cias", label: "CCAS / CIAS" }
				],
				size: 3 / 4,
				required: "Saisissez le statut de l'entreprise"
			},
			{
				type: "group",
				label: "Adresse",
				fields: [
					{
						name: "adresse.rue1",
						label: "Rue",
						required: "Indiquez la rue"
					},
					{
						name: "adresse.rue2",
						label: "Rue (complément)"
					},
					{
						name: "adresse.code_postal",
						label: "CP",
						size: 1 / 4,
						required: "Indiquez le code postal"
					},
					{
						name: "adresse.commune",
						label: "Ville",
						size: 3 / 4,
						required: "Indiquez la commune"
					}
				]
			}
		]
	},
	{
		id: "step-03-contacts",
		title: "Contacts",
		help: {
			description: `Indiquez les coordonnées du contact privilégié de l'adherent, 
puis les emails et numéros de téléphone du standard
ainsi que les sites internet liés à votre activité.`,
			backgroundImage: "https://invie78.fr/images/background-contact.jpg"
		},
		fields: [
			{
				label: "Contact privilégié",
				type: "group",
				fields: [
					{
						name: "representant.prenom",
						label: "Prénom",
						size: 1 / 2,
						required: "Indiquez le prénom du contact privilégié"
					},
					{
						name: "representant.nom",
						label: "Nom",
						size: 1 / 2,
						required: "Indiquez le nom du contact privilégié"
					},
					{
						name: "representant.email",
						label: "Email",
						type: "email",
						size: 1 / 2,
						required: "Indiquez le mail du contact privilégié"
					},
					{
						name: "representant.mobile",
						label: "Mobile",
						type: "tel",
						size: 1 / 2,
						required: "Indiquez le n° de mobile du contact privilégié"
					}
				]
			},
			{
				label: "Accueil",
				type: "group",
				fields: [
					{
						name: "contact.telephone",
						label: "Téléphone",
						type: "tel",
						required: "Quel est le n° de téléphone du standard ?",
						size: 1 / 2
					},
					{
						name: "contact.email",
						label: "Email",
						type: "email",
						required: "Indiquez le mail de contact officiel",
						size: 1 / 2
					}
				]
			},
			{
				label: "Liens Internet",
				type: "group",
				fields: [
					{
						name: "contact.site_web",
						label: "Site Web",
						type: "url",
						size: 1 / 2
					},
					{
						name: "contact.facebook",
						label: "Facebook",
						type: "url",
						size: 1 / 2
					},
					{
						name: "contact.linkedin",
						label: "LinkedIn",
						type: "url",
						size: 1 / 2
					},
					{
						name: "contact.twitter",
						label: "Twitter",
						type: "url",
						size: 1 / 2
					},
					{
						name: "contact.instagram",
						label: "Instagram",
						type: "url",
						size: 1 / 2
					},
					{
						name: "contact.autres",
						label: "Autre",
						type: "url",
						size: 1 / 2
					}
				]
			}
		]
	},
	{
		id: "step-declarations",
		title: "Réseau et Déclarations",
		help: {
			description: `Indiquez votre convention collective, les antennes et ou réseau, enseigne..
Puis indiquez votre numéro d’agrément, de déclaration, d’autorisation.`
		},
		fields: [
			{
				name: "convention_collective",
				label: "Convention Collective",
				type: "select",
				options: {
					"3127": "CC Entreprises de Services à la Personne",
					"2941": "CC Aide, Accompagnement, Soins et Services à domicile"
				}
			},
			{
				name: "antennes",
				label: "Antennes"
			},
			{
				name: "federation_reseau_enseigne",
				label: "Fédération, Réseau ou Enseigne"
			},
			{
				label: "Déclaration",
				type: "group",
				fields: [
					{
						name: "declaration.date",
						label: "Date",
						type: "date",
						size: 1 / 2
					},
					{
						name: "declaration.no",
						label: "No",
						size: 1 / 2,
						placeHolder: "SAP123456789",
						validation: {
							oneNeeded: (data) =>
								!data.declaration.date &&
								!data.agrement.date &&
								data.autorisation.date
									? `Saisissez au moins l'un des 3 : (Déclaration/Agrément/Autorisation)`
									: true,
							formatInvalid: {
								pattern: /^SAP(\d){9}$/,
								message:
									"Le no de déclaration doit commencer par SAP suivi de 9 chiffres.\n Exemple: SAP123456789"
							}
						}
					}
				]
			},
			{
				label: "Agrément",
				type: "group",
				fields: [
					{
						name: "agrement.date",
						label: "Date",
						type: "date",
						size: 1 / 2
					},
					{
						name: "agrement.no",
						label: "No",
						size: 1 / 2,
						placeHolder: "SAP123456789",
						validation: {
							formatInvalid: {
								pattern: /^SAP(\d){9}$/,
								message:
									"Le no d'agrément doit commencer par SAP suivi de 9 chiffres.\n Exemple: SAP123456789"
							}
						}
					}
				]
			},
			{
				label: "Autorisation",
				type: "group",
				fields: [
					{
						name: "autorisation.date",
						label: "Date",
						type: "date",
						size: 1 / 2
					},
					{
						name: "autorisation.no",
						label: "No",
						placeHolder: "2020-999",
						size: 1 / 2,
						validation: {
							formatInvalid: {
								pattern: /^(\d){4}-(\d){2,3}$/,
								message:
									"Le n° d'autorisation doit commencer par une année, un tiret puis 2 ou 3 chiffres.\n Exemple : 2018-34"
							}
						}
					}
				]
			},
			{
				name: "opco",
				label: "OPCO",
				type: "group",
				fields: [
					{
						name: "opco.code",
						type: "select",
						size: 1 / 2,
						options: {
							ep: "OPCO EP",
							uniformation: "OPCO UNIFORMATION",
							cnfpt: "CNFPT"
						}
					}
				]
			}
		]
	},
	{
		id: "step-systemes-gestion",
		title: "Télégestion",
		help: {
			description: `Indiquez vos systèmes de télégestion.`,
			backgroundImage: ""
		},
		fields: [
			{
				name: "systemes_gestion.dispositif_domycile",
				label: "Avez-vous déployé le dispositif Domycile ?",
				type: "ysn",
				defaultValue: false
			},
			{
				name: "systemes_gestion.telegestion",
				label: "Avez-vous déployé un système de télégestion ?",
				type: "ysn",
				defaultValue: false
			},
			{
				name: "systemes_gestion.telegestion_editeur",
				label: "Si oui, quel est votre éditeur ?",
				required: (data) =>
					data.systemes_gestion.telegestion
						? "Indiquez votre éditeur ou le nom de votre système de télégestion"
						: false,
				disabled: (data) => !data.systemes_gestion.telegestion
			},
			{
				name: "systemes_gestion.teletransmission",
				label: "Etes-vous en télétransmission ?",
				type: "ysn",
				defaultValue: false
			}
		]
	},
	{
		id: "step-05-certifications",
		title: "Certifications",
		help: {
			description: `Indiquez les certifications obtenues
(choisissez 'En cours' si le process n'est pas terminé,
sinon indiquez la date de certification et le n° de certification)`
		},
		fields: [
			{
				label: "CERTIFICATION AFNOR",
				type: "group",
				fields: [
					{
						name: "certifications.afnor.statut",
						options: { Y: "Oui", N: "Non", en_cours: "En Cours" },
						type: "radio",
						defaultValue: "N",
						size: 1
					},
					{
						name: "certifications.afnor.date",
						label: "Date",
						type: "date",
						disabled: (data) => data.certifications.afnor.statut !== "Y",
						required: (data) =>
							data.certifications.afnor.statut === "Y"
								? "Indiquez votre date de certification"
								: false,
						size: 3 / 12
					},
					{
						name: "certifications.afnor.no",
						label: "No",
						disabled: (data) => data.certifications.afnor.statut !== "Y",
						required: (data) =>
							data.certifications.afnor.statut === "Y"
								? "Indiquez votre n° de certification"
								: false,
						size: 8 / 12
					}
				]
			},
			{
				label: "CERTIFICATION QUALICERT",
				type: "group",
				fields: [
					{
						name: "certifications.qualicert.statut",
						options: { Y: "Oui", N: "Non", en_cours: "En Cours" },
						type: "radio",
						defaultValue: "N",
						size: 1
					},
					{
						name: "certifications.qualicert.date",
						label: "Date",
						type: "date",
						disabled: (data) => data.certifications.qualicert.statut !== "Y",
						required: (data) =>
							data.certifications.qualicert.statut === "Y"
								? "Indiquez votre date de certification"
								: false,
						size: 3 / 12
					},
					{
						name: "certifications.qualicert.no",
						label: "No",
						disabled: (data) => data.certifications.qualicert.statut !== "Y",
						required: (data) =>
							data.certifications.qualicert.statut === "Y"
								? "Indiquez votre n° de certification"
								: false,
						size: 8 / 12
					}
				]
			},
			{
				label: "CERTIFICATION QUALISAP",
				type: "group",
				fields: [
					{
						name: "certifications.qualisap.statut",
						options: { Y: "Oui", N: "Non", en_cours: "En Cours" },
						type: "radio",
						defaultValue: "N",
						size: 1
					},
					{
						name: "certifications.qualisap.date",
						label: "Date",
						type: "date",
						disabled: (data) => data.certifications.qualisap.statut !== "Y",
						required: (data) =>
							data.certifications.qualisap.statut === "Y"
								? "Indiquez votre date de certification"
								: false,
						size: 3 / 12
					},
					{
						name: "certifications.qualisap.no",
						label: "No",
						disabled: (data) => data.certifications.qualisap.statut !== "Y",
						required: (data) =>
							data.certifications.qualisap.statut === "Y"
								? "Indiquez votre n° de certification"
								: false,
						size: 8 / 12
					}
				]
			},
			{
				label: "CERTIFICATION CAP'HANDEO",
				type: "group",
				fields: [
					{
						name: "certifications.cap_handeo.statut",
						options: { Y: "Oui", N: "Non", en_cours: "En Cours" },
						type: "radio",
						defaultValue: "N",
						size: 1
					},
					{
						name: "certifications.cap_handeo.date",
						label: "Date",
						type: "date",
						disabled: (data) => data.certifications.cap_handeo.statut !== "Y",
						required: (data) =>
							data.certifications.cap_handeo.statut === "Y"
								? "Indiquez votre date de certification"
								: false,
						size: 3 / 12
					},
					{
						name: "certifications.cap_handeo.no",
						label: "No",
						disabled: (data) => data.certifications.cap_handeo.statut !== "Y",
						required: (data) =>
							data.certifications.cap_handeo.statut === "Y"
								? "Indiquez votre n° de certification"
								: false,
						size: 8 / 12
					}
				]
			}
		]
	},
	{
		id: "step-06-syneos",
		title: "Syneos",
		help: {
			description: `Indiquez les clés déjà obtenues et celles que vous souhaiteriez obtenir en commentaires.
Si vous n'avez pas le Label Syneos et souhaitez le mettre en oeuvre avec nous,
indiquez le avec un commentaire sur vos attentes.`
		},
		fields: [
			{
				label: "LABEL SYNEOS",
				type: "group",
				fields: [
					{
						name: "certifications.syneos.statut",
						options: { Y: "Oui", N: "Non", en_cours: "En Cours" },
						type: "radio",
						size: 6 / 12,
						defaultValue: "N"
					},
					{
						name: "certifications.syneos.date",
						label: "Date",
						type: "date",
						size: 4 / 12
					},
					{
						name: "certifications.syneos.cles",
						label: "Clés obtenues",
						type: "checkboxes",
						options: {
							cle1: "Clé 1",
							cle2: "Clé 2",
							cle3: "Clé 3",
							cle4: "Clé 4",
							cle5: "Clé 5",
							cle6: "Clé 6"
						}
					}
				]
			},
			{
				name: "certifications.syneos.a_mettre_en_place",
				label: "Je souhaite mettre en place ce label",
				type: "ysn",
				defaultValue: false
			},
			{
				name: "certifications.syneos.commentaires",
				label: "Commentaires",
				placeHolder: "Souhaitez-vous obtenir une ou des clés supplémentaires ?",
				required: (data) =>
					data.certifications.syneos.a_mettre_en_place
						? "Indiquez vos attentes"
						: false
			}
		]
	},
	{
		id: "step-effectifs",
		title: "Effectifs",
		help: {
			description: `Indiquez vos effectifs en distinguant bien :
l'_effectif total_ par catégorie dans la colonne de gauche
les _équivalents temps plein_ (ETP) dans la colonne de droite.`
		},
		fields: [
			{
				label: "Nombre de salariés",
				type: "group",
				fields: [
					{
						name: "effectifs.total",
						label: "Total",
						type: "integer",
						size: 1 / 2,
						required: "Quel est le nombre total de salarié ?"
					},
					{
						name: "effectifs.etp",
						label: "ETP",
						type: "decimal",
						size: 1 / 2,
						required: true
					}
				]
			},
			{
				label: "Nombre d'intervenants",
				type: "group",
				fields: [
					{
						name: "effectifs.intervenants",
						label: "Total",
						type: "integer",
						size: 1 / 2,
						required: true
					},
					{
						name: "effectifs.intervenants_etp",
						label: "ETP",
						type: "decimal",
						size: 1 / 2,
						required: true
					}
				]
			},
			{
				label: "Nombre de cadres intermédiaires",
				type: "group",
				fields: [
					{
						name: "effectifs.cadres_intermediaires",
						label: "Total",
						type: "integer",
						size: 1 / 2,
						required: true
					},
					{
						name: "effectifs.cadres_intermediaires_etp",
						label: "ETP",
						type: "decimal",
						size: 1 / 2,
						required: true
					}
				]
			}
		]
	},
	{
		id: "step-synthese",
		title: "CA et volume d’heures",
		help: {
			description: `Indiquez le volume d’heures annuelles cumulées 
et le chiffre d'affaire de votre activité.`
		},
		fields: [
			{
				label: "Volume d'heures cumulées",
				type: "group",
				fields: [
					{
						name: "activite.heures_cumulees_apa",
						label: "APA",
						type: "integer",
						size: 1 / 3,
						required: true
					},
					{
						name: "activite.heures_cumulees_pch",
						label: "PCH",
						type: "integer",
						size: 1 / 3,
						required: true
					},
					{
						name: "activite.heures_cumulees_confort",
						label: "Confort",
						type: "integer",
						size: 1 / 3,
						required: true
					}
				]
			},
			{
				label: "Chiffre d'affaires",
				type: "group",
				fields: [
					{
						name: "activite.chiffre_affaires",
						label: "CA",
						type: "decimal",
						suffix: " €",
						size: 1 / 2,
						required: true
					}
				]
			}
		]
	},
	{
		id: "step-beneficiaires",
		title: "Bénéficiaires",
		help: {
			description: `Indiquez le décompte de bénéficiaires de prestations à la personne par catégorie.`
		},
		fields: [
			{
				label: "Vos Bénéficiaires (décompte)",
				type: "group",
				fields: [
					{
						name: "activite.beneficiaires.pa",
						label: "Personnes Agées",
						type: "integer",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.beneficiaires.ph",
						label: "Personnes Handicapées",
						type: "integer",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.beneficiaires.pa_apa",
						label: "Bénéficiaires APA",
						type: "integer",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.beneficiaires.ph_pch",
						label: "Bénéficiaires PCH",
						type: "integer",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.beneficiaires.petite_enfance",
						label: "Enfance (-3 ans)",
						type: "integer",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.beneficiaires.enfance",
						label: "Enfance (+3 ans)",
						type: "integer",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.beneficiaires.confort",
						label: "Bénéficiaires confort",
						type: "integer",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.beneficiaires.autres",
						label: "Autres",
						type: "integer",
						size: 1 / 2
					},
					{
						name: "activite.beneficiaires.autres_detail",
						label: "Autre Bénéficiaires : Préciser si nécessaire"
					}
				]
			}
		]
	},
	{
		id: "step-activite-ratios",
		title: "Activité (%)",
		help: {
			description: `Indiquez votre _ratio_ d'activité (%) dans chaque catégorie de prestation.`
		},
		fields: [
			{
				label: "Votre Activité (ratios)",
				type: "group",
				fields: [
					{
						name: "activite.ratios.pa",
						label: "Personnes Agées",
						type: "percent",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.ratios.ph",
						label: "Personnes Handicapées",
						type: "percent",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.ratios.transport",
						label: "Transport adapté",
						type: "percent",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.ratios.petite_enfance",
						label: "Enfance (-3 ans)",
						type: "percent",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.ratios.mandataire",
						label: "Part Mandataires",
						type: "percent",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.ratios.prestataire",
						label: "Part Prestataires",
						type: "percent",
						required: true,
						size: 1 / 2
					},
					{
						name: "activite.ratios.confort",
						label: "Activité de confort",
						type: "percent",
						required: true,
						size: 1 / 2
					}
				]
			}
		]
	},
	{
		id: "step-domaines-intervention",
		title: "Domaines d'intervention",
		help: {
			description: `Cochez chacun des domaines d'intervention qui s'applique à votre activité.`
		},
		fields: [
			{
				name: "domaines.codes",
				type: "checkboxes",
				options: {
					aide_a_la_toilette: "Aide à la Toilette",
					accompagnement: "Accompagnement",
					animation: "Animation",
					bricolage: "Bricolage",
					transports: "Transports",
					courses: "Courses",
					garde_enfants: "Garde d'enfants",
					garde_malade: "Garde Malade / de nuit",
					soutien_scolaire: "Soutien scolaire",
					homme_a_tout_faire: "Homme 'toutes mains'",
					jardinage: "Jardinage",
					menage: "Ménage",
					portage_repas: "Portage repas",
					repassage: "Repassage",
					repas: "Repas",
					demarches_administratives: "Démarches administratives et numériques",
					autre: "Autres"
				}
			},
			{
				name: "domaines.autres",
				label: "Autres activités"
			}
		]
	},
	{
		id: "step-demande-contact",
		title: "Demande de contact",
		help: {
			backgroundImage: "call-me.svg",
			backgroundSize: "50%",
			backgroundPosition: "center"
		},
		fields: [
			{
				name: "demande_contact_adherent",
				label: "Souhaitez-vous être recontacté pour un RV adhérent ?",
				type: "ysn"
			}
		]
	},
	{
		id: "step-registration-recap",
		title: "Dernière étape",
		help: {
			description: `## Félicitation !
Votre processus d’adhésion est presque terminé.
Vous pouvez revenir en arrière pour vérifier une dernière fois les informations saisies.
En choisissant Paiement en ligne vous activerez immédiatement votre adhésion à notre service. 
Pour le paiement par chèque imprimer votre appel de fond et glissez le dans l'enveloppe avec la référence de votre adhésion.
Cliquez sur Valider pour envoyer votre demande.
[Télécharger votre appel de fond](/)`,
			backgroundImage: "registration-complete-background.svg"
		},
		fields: [
			{
				type: "group",
				label: "Choisissez votre mode de règlement (200€ par an).",
				fields: [
					{
						name: "adhesion.mode_reglement",
						type: "radio",
						size: 1,
						options: {
							en_ligne: "Paiement en ligne",
							cheque: "Par chèque à l'ordre de INVIE"
						}
					}
				]
			}
		],
		validate: async (formData, loggedUser) => {
			try {
				console.log(formData);
				await register(loggedUser, formData);
			} catch (err) {
				alert(err.message);
			}
		}
	}
];

/**
 * Look if we have an incomplete registration process in the local storage
 * Or create
 */
const initRegistration = (loggedUser) => {
	const savedState = window.localStorage.getItem("registration-wizard");
	if (savedState) {
		try {
			initialState = JSON.parse(savedState);
		} catch (err) {
			window.localStorage.removeItem(id);
		}
		console.log(
			`Restoring saved state from localStorage: ${JSON.stringify(initialState)} `
		);
	}
};

const RegistrationWizard = () => {
	const loggedUser = useAuthentication();
	const data = initRegistration(loggedUser);
	return <Wizard id="registration-wizard" data={data} steps={steps} />;
};

export default RegistrationWizard;
