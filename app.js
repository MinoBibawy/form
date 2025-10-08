// ===== Quiz: 10 card, 5 opzioni ciascuna (single-choice) =====
// Mostra una card per volta; la successiva appare dopo la selezione.
// Soglia finale: una categoria vince se ha > 2 selezioni (almeno 3).
// Mini avanzamento: riga di 10 puntini sotto al titolo card. Nessun pulsante "Mescola".

(function(){
  const CATEGORIES = {
    mano:   { label: "✋ Mano – Servitore Pratico" },
    bocca:  { label: "🗣️ Bocca – Comunicatore e Incoraggiatore" },
    orecchio:{ label: "👂 Orecchio – Ascoltatore e Consolatore" },
    piede:  { label: "🦶 Piede – Motore e Messaggero" },
    cuore:  { label: "❤️ Cuore – Intercessore Compassionevole" },
    occhio: { label: "👁️ Occhio – Vigile e Discernitore" },
  };

  const QUESTIONS = [
    "Entri a un evento in chiesa e noti qualcuno seduto da solo. Cosa fai?",
    "Un amico sta lottando con una decisione difficile. Qual è il tuo primo istinto?",
    "Durante il momento di preghiera di gruppo, di solito tu…",
    "Ti chiedono di unirti a un servizio. Quale ruolo ti rappresenta di più?",
    "Quando nasce una nuova idea o un problema, tu dici…",
    "Durante un ritiro della chiesa, il responsabile chiede volontari. Tu pensi subito…",
    "Scopri che qualcuno della che conosci è malato. Cosa fai per prima cosa?",
    "Sta per iniziare una funzione in chiesa. Ti senti più portato a…?",
    "Stai preparando una giornata di servizio per il gruppo giovani. Il tuo punto di forza è…",
    "La messa è in ritardo. Tendi a…",
  ];

  // Contenuti descrittivi del risultato per ciascun archetipo
  const RESULT_CONTENT = {
    bocca: `
      <h2>🗣️ LA BOCCA — Il Comunicatore e l’Incoraggiatore</h2>
      <p>Le parole sono il tuo dono — e la tua chiamata. Ami insegnare, predicare, spiegare e ispirare. Dici la verità, incoraggi gli altri e spesso hai un messaggio che arde nel tuo cuore.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Ispira gli altri attraverso la parola</li>
        <li>Chiaro comunicatore della verità</li>
        <li>Incoraggia, insegna o guida</li>
        <li>Aiuta a dare linguaggio alla fede delle persone</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può dominare le conversazioni</li>
        <li>Può avere difficoltà ad ascoltare bene</li>
        <li>Rischia di parlare troppo in fretta o con durezza</li>
        <li>Ha bisogno di umiltà per equilibrare la propria voce</li>
      </ul>
      <p><strong>Esempio di santo:</strong> San Pietro Apostolo</p>
    `,
    orecchio: `
      <h2>👂 L’ORECCHIO — L’Ascoltatore e il Consolatore</h2>
      <p>Sei la persona con cui gli altri si sentono a proprio agio nel parlare. Non ti affretti a risolvere o a parlare — semplicemente ascolti. Offri un dono raro: silenzio, presenza e profondo sostegno emotivo.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Paziente e degno di fiducia</li>
        <li>Crea spazio per l’autenticità degli altri</li>
        <li>Emotivamente sicuro e di supporto</li>
        <li>Eccellente nelle relazioni individuali</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può assorbire troppo peso emotivo</li>
        <li>Può diventare passivo o tacere quando servirebbe parlare</li>
        <li>Fa fatica a difendere se stesso</li>
        <li>Ha bisogno di confini chiari per restare equilibrato</li>
      </ul>
      <p><strong>Esempio di santa:</strong> Maria, sorella di Marta e Lazzaro</p>
    `,
    piede: `
      <h2>🦶 IL PIEDE — Il Messaggero e il Portatore di Movimento</h2>
      <p>Sei un realizzatore. Ami l’azione, il movimento e la missione. Che si tratti di raggiungere nuove persone o di iniziare qualcosa di nuovo, sei mosso dal desiderio di avere un impatto.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Coraggioso ed energico</li>
        <li>Guidato da visione e scopo</li>
        <li>Bravo a mobilitare gli altri</li>
        <li>Disposto ad andare dove altri non vanno</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può agire senza riflettere abbastanza</li>
        <li>Può diventare impaziente o irrequieto</li>
        <li>Può sottovalutare i ruoli più lenti o silenziosi</li>
        <li>Ha bisogno di ancorarsi alla disciplina spirituale</li>
      </ul>
      <p><strong>Esempio di santo:</strong> San Paolo Apostolo</p>
    `,
    cuore: `
      <h2>❤️ IL CUORE — Il Compassionevole e l’Intercessore</h2>
      <p>Senti profondamente. Porti gli altri nella preghiera, nell’amore e nella quiete. Sei spesso mosso alle lacrime per gli altri e hai una grande capacità di confortare e prenderti cura. Le persone si sentono al sicuro con te.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Empatico e sensibile</li>
        <li>Potente nella preghiera d’intercessione</li>
        <li>Crea un’atmosfera di sicurezza e guarigione</li>
        <li>Mosso da amore e misericordia</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può sentirsi sopraffatto emotivamente</li>
        <li>Può assumersi pesi che non gli appartengono</li>
        <li>Può avere difficoltà a stabilire confini sani</li>
        <li>Ha bisogno di un costante rinnovamento spirituale</li>
      </ul>
      <p><strong>Esempio di santo:</strong> San Giovanni, il Discepolo Amato</p>
    `,
    occhio: `
      <h2>👁️ L’OCCHIO — Il Vigile e il Perspicace</h2>
      <p>Hai sensibilità e discernimento spirituale. Noti ciò che gli altri non vedono — emozioni nascoste, pericoli, potenziale inespresso. Spesso guidi gli altri con saggezza e intuizione spirituale.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Discernimento spirituale</li>
        <li>Attento e consapevole della visione d’insieme</li>
        <li>Aiuta gli altri a vedere chiaramente nella confusione</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può sembrare critico o troppo analitico</li>
        <li>Può sentirsi isolato o frainteso</li>
        <li>Rischia l’orgoglio nel “vedere più degli altri”</li>
        <li>Può esitare ad agire, aspettando troppa chiarezza</li>
      </ul>
      <p><strong>Esempio di santo:</strong> San Giuseppe</p>
    `,
    mano: `
      <h2>✋ LA MANO — Il Servitore Pratico</h2>
      <p>Sei affidabile, laborioso e concreto. Ami servire gli altri in modo silenzioso ed efficiente. Potresti agire dietro le quinte, ma nulla funzionerebbe senza di te.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Affidabile e degno di fiducia</li>
        <li>Disponibile ad aiutare in ogni modo</li>
        <li>Realizza visioni e piani</li>
        <li>Mantiene la squadra o la chiesa in funzione armoniosa</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può sentirsi trascurato o non apprezzato</li>
        <li>Può esaurirsi per troppo lavoro</li>
        <li>Può avere difficoltà a dire “no”</li>
        <li>Può dare priorità al fare piuttosto che all’essere</li>
      </ul>
      <p><strong>Esempio di santa:</strong> Santa Marta</p>
    `,
  };

  // ====== I18N (Arabic - Egypt) ======
  const UI_IT = {
    pageTitle: '🔎 Scopri il tuo dono',
    h1: '🔎 Scopri il tuo dono',
    submit: '✅ Scopri il risultato',
    error: '⚠️ Per favore rispondi a tutte le situazioni.'
  };
  const UI_AR = {
    pageTitle: 'اكتشف عطيتك 🔎',
    h1: 'اكتشف عطيتك 🔎',
    submit: 'اعرف النتيجة ✅',
    error: '⚠️ من فضلك جاوب على كل المواقف.'
  };

  const CATEGORIES_AR = {
    mano:   { label: '✋ اليد - خادم عملي' },
    bocca:  { label: '🗣️ الفم - متحدث ومشجّع' },
    orecchio:{ label: '👂 الأذن - مستمع ومُعزٍ' },
    piede:  { label: '🦶 القدم - محرّك ورسول' },
    cuore:  { label: '❤️ القلب - شفيع رحيم' },
    occhio: { label: '👁️ العين - يقِظ ومميِّز' },
  };

  // Ensure category labels show emojis for both languages
  try{
    CATEGORIES.mano.label    = '✋ Mano - Servitore Pratico';
    CATEGORIES.bocca.label   = '🗣️ Bocca - Comunicatore e Incoraggiatore';
    CATEGORIES.orecchio.label= '👂 Orecchio - Ascoltatore e Consolatore';
    CATEGORIES.piede.label   = '🦶 Piede - Motore e Messaggero';
    CATEGORIES.cuore.label   = '❤️ Cuore - Intercessore Compassionevole';
    CATEGORIES.occhio.label  = '👁️ Occhio - Vigile e Discernitore';
  }catch(e){}

  try{
    CATEGORIES_AR.mano.label    = '✋ اليد - الخادم العملي';
    CATEGORIES_AR.bocca.label   = '🗣️ الفم - المتحدث والمُشجّع';
    CATEGORIES_AR.orecchio.label= '👂 الأذن - المستمع والمُعزّي';
    CATEGORIES_AR.piede.label   = '🦶 القدم - المحرّك والرسول';
    CATEGORIES_AR.cuore.label   = '❤️ القلب - الشفيع الرحيم';
    CATEGORIES_AR.occhio.label  = '👁️ العين - اليقِظ والمميِّز';
  }catch(e){}

  const QUESTIONS_AR = [
    'تدخل فعالية في الكنيسة وتلاحظ شخصاً يجلس منفرداً. ماذا تفعل؟',
    'صديق لك يواجه قراراً صعباً. ما هو أول رد فعل لديك؟',
    'أثناء صلاة الجماعة، عادةً ما...',
    'يطلبون منك الانضمام إلى خدمة. أي دور يمثّلك أكثر؟',
    'عندما تظهر فكرة جديدة أو مشكلة، أنت تقول...',
    'خلال خلوة الكنيسة، يطلب المسؤول متطوّعين. تفكر فوراً بـ...',
    'تكتشف أن أحد أفراد عائلتك مريض. ما أول شيء تفعله؟',
    'على وشك أن تبدأ فعالية في الكنيسة. تميل أكثر إلى...؟',
    'تستعد ليوم خدمة لمجموعة الشباب. نقطة قوتك هي...',
    'الخدمة متأخرة. تميل إلى...'
  ];

  // Emoji questions (IT & AR)
  const QUESTIONS_IT_EMOJI = [
    "🎉 Entri a un evento in chiesa e noti qualcuno seduto da solo. Cosa fai?",
    "🤝 Un amico sta affrontando una decisione difficile. Qual è la tua prima reazione?",
    "🙏 Durante il momento di preghiera di gruppo, di solito tu…",
    "🧩 Ti chiedono di partecipare a un servizio. Quale ruolo ti rappresenta di più?",
    "💡 Davanti a una nuova idea o a un problema, di solito dici…",
    "🙋‍♀️ Durante un ritiro in chiesa, il responsabile chiede volontari. Il tuo primo pensiero è…",
    "🏥 Scopri che un familiare è malato. Qual è la prima cosa che fai?",
    "⛪ Sta per iniziare una funzione in chiesa. Ti senti più portato a…?",
    "🛠️ Stai organizzando una giornata di servizio per i giovani. Il tuo punto di forza è…",
    "⏳ La messa è in ritardo. Tendi a…",
  ];

  const QUESTIONS_AR_EMOJI = [
    '🎉 تدخل فعالية في الكنيسة وتلاحظ شخصاً يجلس وحده. ماذا تفعل؟',
    '🤝 صديقك يواجه قراراً صعباً. ما أول رد فعل لديك؟',
    '🙏 أثناء صلاة الجماعة، عادةً ما تفعل...',
    '🧩 يُطلب منك المشاركة في خدمة. أي دور يناسبك أكثر؟',
    '💡 عند ظهور فكرة جديدة أو مشكلة، عادةً تقول...',
    '🙋‍♀️ في خلوة كنسية، يطلب المسؤول متطوعين. ما أول ما تفكر فيه؟',
    '🏥 تكتشف أن أحد أفراد عائلتك مريض. ما أول شيء تفعله؟',
    '⛪ فعالية كنسية على وشك أن تبدأ. تميل أكثر إلى...؟',
    '🛠️ تُحضّر ليوم خدمة مع مجموعة الشباب. ما هي نقطة قوتك؟',
    '⏳ الخدمة تأخرت. تميل إلى أن...',
  ];

  const QUESTION_OPTIONS_IT = [
    [
      { cat:'mano', text:"Mi offro di sistemare le sedie e creare un posto accogliente accanto a lui." },
      { cat:'bocca', text:"Gli rivolgo la parola e lo coinvolgo in una conversazione calda." },
      { cat:'orecchio', text:"Mi siedo vicino e ascolto se desidera raccontare qualcosa." },
      { cat:'piede', text:"Lo accompagno a conoscere qualcun altro del gruppo." },
      { cat:'cuore', text:"Prego per lui e con gentilezza gli chiedo come sta." }
    ],
    [
      { cat:'bocca', text:"Condivido un consiglio incoraggiante e passi biblici utili." },
      { cat:'orecchio', text:"Lo ascolto senza interrompere finche' non si sente compreso." },
      { cat:'cuore', text:"Mi offro di pregare con lui per pace e chiarezza." },
      { cat:'occhio', text:"Analizzo con lui pro e contro per capire cosa c'e' sotto." },
      { cat:'mano', text:"Lo aiuto a fissare i prossimi passi pratici della scelta." }
    ],
    [
      { cat:'cuore', text:"Intercedo a lungo per i bisogni del gruppo." },
      { cat:'bocca', text:"Guido la preghiera a voce alta con entusiasmo." },
      { cat:'orecchio', text:"Ascolto attentamente gli altri e confermo cio' che condividono." },
      { cat:'occhio', text:"Discerno quale direzione spirituale seguire." },
      { cat:'piede', text:"Propongo di uscire poi a servire concretamente chi ha bisogno." }
    ],
    [
      { cat:'mano', text:"Mi offro per la logistica e i dettagli pratici." },
      { cat:'piede', text:"Guido il team nelle attivita' fuori dalla chiesa." },
      { cat:'bocca', text:"Mi vedo a insegnare o comunicare dal palco." },
      { cat:'occhio', text:"Coordino la sicurezza osservando tutto cio' che succede." },
      { cat:'cuore', text:"Accolgo e mi prendo cura delle persone ferite." }
    ],
    [
      { cat:'bocca', text:"Condivido subito parole che motivano il gruppo." },
      { cat:'occhio', text:"Analizzo cosa manca e quali rischi vedo." },
      { cat:'mano', text:"Preparo un piano operativo concreto." },
      { cat:'piede', text:"Suggerisco di metterci in movimento al piu' presto." },
      { cat:'orecchio', text:"Propongo di ascoltare tutti prima di decidere." }
    ],
    [
      { cat:'piede', text:"Mi offro di guidare un'uscita missionaria durante il ritiro." },
      { cat:'mano', text:"Allestisco gli spazi e mi occupo della logistica." },
      { cat:'cuore', text:"Creo un angolo di preghiera e ascolto per chi ne ha bisogno." },
      { cat:'bocca', text:"Guido uno dei momenti di insegnamento." },
      { cat:'occhio', text:"Supervisiono il programma assicurandomi che resti equilibrato." }
    ],
    [
      { cat:'cuore', text:"Mi metto subito in preghiera per la sua guarigione." },
      { cat:'mano', text:"Organizzo pasti e supporto pratico per la famiglia." },
      { cat:'orecchio', text:"Lo chiamo per ascoltare e capire come si sente." },
      { cat:'piede', text:"Raccolgo altre persone per andare a trovarlo." },
      { cat:'bocca', text:"Gli invio parole di incoraggiamento e speranza." }
    ],
    [
      { cat:'piede', text:"Accolgo fuori chi arriva in ritardo e lo accompagno dentro." },
      { cat:'bocca', text:"Guido il canto o apro la funzione parlando alla comunita'." },
      { cat:'occhio', text:"Osservo chi ha bisogno di aiuto e segnalo eventuali problemi." },
      { cat:'mano', text:"Controllo che tutta la tecnica funzioni correttamente." },
      { cat:'cuore', text:"Resto a pregare perche' l'incontro tocchi i cuori." }
    ],
    [
      { cat:'mano', text:"Organizzo materiali e cronoprogramma della giornata." },
      { cat:'piede', text:"Guido le squadre sul territorio." },
      { cat:'bocca', text:"Motivo i giovani raccontando testimonianze." },
      { cat:'cuore', text:"Creo momenti di cura per chi e' affaticato." },
      { cat:'occhio', text:"Valuto sicurezza e bisogni emergenti durante l'evento." }
    ],
    [
      { cat:'occhio', text:"Osservo che cosa sta causando il ritardo per anticipare i problemi." },
      { cat:'cuore', text:"Prego perche' tutti restino sereni e pazienti." },
      { cat:'piede', text:"Mi muovo per aiutare dove serve accelerare." },
      { cat:'mano', text:"Sistemo i dettagli pratici per ripartire rapidamente." },
      { cat:'orecchio', text:"Ascolto chi e' frustrato e lo rassicuro con calma." }
    ]
  ];

  const QUESTION_OPTIONS_AR = [
    [
      { cat:'mano', text:"أرتب المقاعد وأهيئ مكانًا مرحبًا بجانبه." },
      { cat:'bocca', text:"أبدأ الحديث معه وأشجعه بكلمات دافئة." },
      { cat:'orecchio', text:"أجلس بجانبه وأصغي إن أراد أن يشارك شيئًا." },
      { cat:'piede', text:"أصطحبه ليتعرّف على أشخاص آخرين." },
      { cat:'cuore', text:"أصلي لأجله وأسأله بلطف عن حاله." }
    ],
    [
      { cat:'bocca', text:"أشاركه نصيحة مشجعة ومقاطع كتابية مناسبة." },
      { cat:'orecchio', text:"أتركه يتكلم حتى يشعر أنه مسموع." },
      { cat:'cuore', text:"أقترح أن نصلي معًا من أجل السلام والوضوح." },
      { cat:'occhio', text:"نحلّل الإيجابيات والسلبيات لنفهم ما يحدث." },
      { cat:'mano', text:"أساعده على ترتيب الخطوات العملية للقرار." }
    ],
    [
      { cat:'cuore', text:"أتشفع مطولًا من أجل احتياجات المجموعة." },
      { cat:'bocca', text:"أقود الصلاة بصوت واضح وحماس." },
      { cat:'orecchio', text:"أصغي للآخرين وأدعم ما يشاركون به." },
      { cat:'occhio', text:"أميّز الاتجاه الروحي الذي ينبغي اتباعه." },
      { cat:'piede', text:"أقترح خدمة عملية بعد وقت الصلاة مباشرة." }
    ],
    [
      { cat:'mano', text:"أتطوع للاهتمام باللوجستيات والتفاصيل." },
      { cat:'piede', text:"أقود الفريق في الأنشطة خارج الكنيسة." },
      { cat:'bocca', text:"أرى نفسي أعلّم أو أتحدث أمام الجميع." },
      { cat:'occhio', text:"أراقب ما يجري وأحافظ على التنظيم الجيد." },
      { cat:'cuore', text:"أعتني بالناس الذين يأتون مجروحين ومتعبين." }
    ],
    [
      { cat:'bocca', text:"أشارك كلمات تحفّز المجموعة فورًا." },
      { cat:'occhio', text:"أفحص ما ينقصنا والمخاطر المحتملة." },
      { cat:'mano', text:"أعرض أن أضع خطة تنفيذية واضحة." },
      { cat:'piede', text:"أشجعنا على أن نتحرك بأسرع وقت." },
      { cat:'orecchio', text:"أقترح أن نستمع للجميع قبل اتخاذ القرار." }
    ],
    [
      { cat:'piede', text:"أتطوع لقيادة خروج تبشيري أثناء الخلوة." },
      { cat:'mano', text:"أجهز القاعات وأهتم باللوازم." },
      { cat:'cuore', text:"أعد ركنًا للصلاة والإصغاء لمن يحتاج." },
      { cat:'bocca', text:"أقود أحد أوقات التعليم." },
      { cat:'occhio', text:"أتابع البرنامج لأضمن توازنه." }
    ],
    [
      { cat:'cuore', text:"أبدأ الصلاة فورًا من أجل شفائه." },
      { cat:'mano', text:"أنظم وجبات ودعمًا عمليًا للعائلة." },
      { cat:'orecchio', text:"أتصل به لأسمع كيف يشعر." },
      { cat:'piede', text:"أجمع آخرين لزيارته في أقرب وقت." },
      { cat:'bocca', text:"أرسل له كلمات تشجيع ورجاء." }
    ],
    [
      { cat:'piede', text:"أستقبل المتأخرين وأرافقهم إلى أماكنهم." },
      { cat:'bocca', text:"أقود الترنيم أو أفتتح اللقاء بكلمة." },
      { cat:'occhio', text:"أراقب من يحتاج إلى مساعدة وأبلغ الفريق." },
      { cat:'mano', text:"أتأكد أن المعدات والصوت يعملان جيدًا." },
      { cat:'cuore', text:"أبقى أصلي كي يكون الاجتماع مؤثرًا." }
    ],
    [
      { cat:'mano', text:"أنظم المواد والجدول الزمني لليوم." },
      { cat:'piede', text:"أقود الفرق الميدانية في الخدمة." },
      { cat:'bocca', text:"أحمّس الشباب بقصص وشهادات." },
      { cat:'cuore', text:"أهتم بمن يتعب وأوفر له الراحة." },
      { cat:'occhio', text:"أراقب السلامة واحتياجات الناس خلال الحدث." }
    ],
    [
      { cat:'occhio', text:"ألاحظ سبب التأخير لأتوقع المشكلات." },
      { cat:'cuore', text:"أصلي كي يبقى الجميع هادئين وصبورين." },
      { cat:'piede', text:"أتحرك لمساعدة من يحتاج لتسريع الأمور." },
      { cat:'mano', text:"أرتب التفاصيل العملية كي نعود للعمل بسرعة." },
      { cat:'orecchio', text:"أستمع لمن ينزعج لأهدئه بكلمات مطمئنة." }
    ]
  ];

  const RESULT_CONTENT_AR = {
    bocca: `
      <h2>🗣️ الفم - المتحدث والمُشجِّع</h2>
      <p>الكلمات هي عطيتك ورسالتك. تحب أن تعلّم وتبشّر وتشرح وتُلهم. تقول الحق، وتشجّع الآخرين، وغالباً ما تحمل رسالة مشتعلة في قلبك.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>إلهام الآخرين بالكلمة</li>
        <li>تواصل واضح للحق</li>
        <li>تشجيع وتعليم وقيادة</li>
        <li>تمنح الناس لغة يعبّرون بها عن إيمانهم</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد تسيطر على الحوار</li>
        <li>قد تجد صعوبة في الاستماع جيداً</li>
        <li>خطر الإسراع في الكلام أو القسوة</li>
        <li>تحتاج إلى التواضع لموازنة صوتك</li>
      </ul>
      <p><strong>🕊️ مثال قديس:</strong> القديس بطرس الرسول</p>
    `,
    orecchio: `
      <h2>👂 الأذن - المستمع والمُعزّي</h2>
      <p>أنت الشخص الذي يرتاح الآخرون للحديث معه. لا تتعجل في الحلول أو الكلام — بل تستمع ببساطة. تقدّم عطية نادرة: الصمت والحضور والدعم العاطفي العميق.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>صبور وجدير بالثقة</li>
        <li>يخلق مساحة لأصالة الآخرين</li>
        <li>آمن عاطفياً وداعم</li>
        <li>ممتاز في العلاقات الفردية</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد يمتص وزناً عاطفياً زائداً</li>
        <li>قد يصبح سلبياً أو يصمت حين يلزم الكلام</li>
        <li>يصعب عليه الدفاع عن نفسه</li>
        <li>يحتاج إلى حدود واضحة ليبقى متوازناً</li>
      </ul>
      <p><strong>🕊️ مثال قديسة:</strong> مريم أخت مرتا ولعازر</p>
    `,
    piede: `
      <h2>🦶 القدم - الرسول ومحرك الحركة</h2>
      <p>أنت منجز. تحب الحركة والعمل والرسالة. سواء في الوصول إلى أشخاص جدد أو بدء شيء جديد، تدفعك الرغبة في التأثير.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>شجاع ومفعم بالطاقة</li>
        <li>مدفوع بالرؤية والغاية</li>
        <li>بارع في تعبئة الآخرين</li>
        <li>مستعد للذهاب حيث لا يذهب الآخرون</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد يتصرف دون قدر كافٍ من التأمل</li>
        <li>قد يصبح غير صبور أو قلق</li>
        <li>قد يستهين بالأدوار الأبطأ أو الصامتة</li>
        <li>بحاجة إلى الارتساء بالانضباط الروحي</li>
      </ul>
      <p><strong>🕊️ مثال قديس:</strong> القديس بولس الرسول</p>
    `,
    cuore: `
      <h2>❤️ القلب - الشفيع الرحيم</h2>
      <p>تشعر بعمق. تحمل الآخرين في الصلاة والمحبة والهدوء. كثيراً ما تتحرك بالدموع من أجل الآخرين ولديك قدرة كبيرة على التعزية والاعتناء. الناس يشعرون بالأمان معك.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>متعاطف وحسّاس</li>
        <li>قوي في صلاة الشفاعة</li>
        <li>يخلق جواً من الأمان والشفاء</li>
        <li>مدفوع بالمحبة والرحمة</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد يشعر بالإرهاق العاطفي</li>
        <li>قد يجد صعوبة في وضع حدود</li>
        <li>قد يحمل أثقالاً لا تخصّه</li>
        <li>يحتاج إلى رعاية ذاته والراحة</li>
      </ul>
      <p><strong>🕊️ مثال قديس:</strong> القديس يوسف</p>
    `,
    mano: `
      <h2>✋ اليد - الخادم العملي</h2>
      <p>موثوق ومجتهد وعملي. تحب خدمة الآخرين بصمت وبكفاءة. قد تعمل خلف الكواليس، لكن لا شيء يعمل من دونك.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>موثوق وجدير بالثقة</li>
        <li>مستعد للمساعدة بأي طريقة</li>
        <li>يحقق الرؤى والخطط</li>
        <li>يبقي الفريق أو الكنيسة تعمل بانسجام</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد يشعر بأنه مُهمَل أو غير مُقدّر</li>
        <li>قد ينهك من كثرة العمل</li>
        <li>قد يجد صعوبة في قول «لا»</li>
        <li>قد يقدّم العمل على الكينونة</li>
      </ul>
      <p><strong>🕊️ مثال قديسة:</strong> القديسة مرتا</p>
    `,
  };

  // Current language state + helpers
  let CURRENT_LANG = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'it';
  function getLang(){ return CURRENT_LANG; }
  function t(key){ return (CURRENT_LANG === 'ar' ? UI_AR : UI_IT)[key] || ''; }
  function getCategories(){ return CURRENT_LANG === 'ar' ? CATEGORIES_AR : CATEGORIES; }
  function getQuestions(){ return CURRENT_LANG === 'ar' ? QUESTIONS_AR_EMOJI : QUESTIONS_IT_EMOJI; }
  function getQuestionOptions(){ return CURRENT_LANG === 'ar' ? QUESTION_OPTIONS_AR : QUESTION_OPTIONS_IT; }
  function getResultContent(){ return CURRENT_LANG === 'ar' ? RESULT_CONTENT_AR : RESULT_CONTENT; }
  function applyStaticTexts(){
    const titleEl = document.getElementById('title');
    if(titleEl) titleEl.textContent = t('h1');
    const submitBtnEl = document.getElementById('submitBtn');
    if(submitBtnEl) submitBtnEl.textContent = t('submit');
    const errorEl = document.getElementById('error');
    if(errorEl) errorEl.textContent = t('error');
    document.title = t('pageTitle');
    const toggle = document.getElementById('langToggle');
    if(toggle){
      toggle.textContent = CURRENT_LANG === 'ar' ? '🇮🇹 IT' : '🇪🇬 AR';
      toggle.setAttribute('aria-label', CURRENT_LANG === 'ar' ? 'بدّل اللغة إلى الإيطالية' : 'Cambia lingua in arabo');
      toggle.title = CURRENT_LANG === 'ar' ? '🇮🇹 Italiano' : '🇪🇬 العربية';
    }
    // Emoji: flags + gift
    try{
      const toggle2 = document.getElementById('langToggle');
      if(toggle2){
        toggle2.textContent = CURRENT_LANG === 'ar' ? '🇮🇹 IT' : '🇪🇬 AR';
        toggle2.setAttribute('aria-label', CURRENT_LANG === 'ar' ? 'بدّل اللغة إلى الإيطالية' : 'Cambia lingua in arabo');
        toggle2.title = CURRENT_LANG === 'ar' ? '🇮🇹 Italiano' : '🇪🇬 العربية';
      }
      if(titleEl && !titleEl.textContent.includes('🎁')) titleEl.textContent += ' 🎁';
      if(document.title && !document.title.includes('🎁')) document.title += ' 🎁';
    }catch(e){}
  }
  function applyDirLang(){
    document.documentElement.lang = CURRENT_LANG === 'ar' ? 'ar-EG' : 'it';
    document.documentElement.dir = CURRENT_LANG === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', CURRENT_LANG === 'ar');
  }
  function setLang(lang){
    CURRENT_LANG = (lang === 'ar') ? 'ar' : 'it';
    try{ localStorage.setItem('lang', CURRENT_LANG); }catch(e){}
    applyDirLang();
    applyStaticTexts();
    // rebuild UI
    buildCards();
    attachHandlers();
  }

  const TIE_BREAK = ["mano","bocca","orecchio","piede","cuore","occhio"];

  function buildCards(){
    const container = document.getElementById("quiz");
    if(!container) return;
    container.innerHTML = "";
    // Assicurati che il bottone sia nascosto su mobile all'inizio
    try{
      const actions = document.querySelector('.actions');
      actions?.classList.remove('show-on-mobile');
      document.body.classList.remove('mobile-actions-shown');
    }catch(e){}
    const Q = getQuestions();
    const optionsByQuestion = getQuestionOptions();
    Q.forEach((qText, idx) => {
      const card = document.createElement("section");
      card.className = "card-q" + (idx===0 ? "" : " hidden");
      card.dataset.index = String(idx);

      const h3 = document.createElement("h3");
      h3.textContent = qText;
      card.appendChild(h3);

      // Mini progress (10 dots)
      const mini = document.createElement('div');
      mini.className = 'mini-progress';
      mini.setAttribute('role','progressbar');
      mini.setAttribute('aria-valuemin','1');
      mini.setAttribute('aria-valuemax', String(Q.length));
      mini.setAttribute('aria-valuenow', String(idx+1));
      for(let d=0; d<Q.length; d++){
        const dot = document.createElement('span');
        dot.className = 'dot' + (d < idx+1 ? ' filled' : '');
        mini.appendChild(dot);
      }
      card.appendChild(mini);

      const optsWrap = document.createElement("div");
      optsWrap.className = "options-list";

      const name = `q${idx+1}`;
      const options = Array.isArray(optionsByQuestion[idx]) ? optionsByQuestion[idx] : [];
      options.forEach((opt, oi) => {
        const id = `${name}-opt${oi+1}`;
        const label = document.createElement("label");
        label.className = "opt";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.id = id;
        input.value = opt.text;
        input.required = (idx===0);
        input.dataset.cat = opt.cat;

        const span = document.createElement("span");
        span.textContent = opt.text;

        label.appendChild(input);
        label.appendChild(span);
        optsWrap.appendChild(label);
      });

      card.appendChild(optsWrap);
      container.appendChild(card);
    });
  }

  function revealNext(currentIdx){
    const current = document.querySelector(`.card-q[data-index="${currentIdx}"]`);
    const next = document.querySelector(`.card-q[data-index="${currentIdx+1}"]`);
    if(next){
      current?.classList.add("hidden"); // mostra solo la card appena raggiunta
      if(next.classList.contains("hidden")){
        next.classList.remove("hidden");
        next.querySelectorAll('input[type="radio"]').forEach(r => r.required = true);
      }
      next.scrollIntoView({behavior:"smooth", block:"start"});
    }else if(!next){
      const actions = document.querySelector(".actions");
      // Su schermi piccoli mostra il bottone solo alla fine
      const isSmall = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
      if(isSmall && actions){
        actions.classList.add('show-on-mobile');
        // Abilita lo scroll verticale della pagina quando il bottone appare
        document.body.classList.add('mobile-actions-shown');
      }
      actions && actions.scrollIntoView({behavior:"smooth", block:"center"});
    }
  }

  function attachHandlers(){
    // Ritarda il passaggio alla prossima card per mostrare il colore selezionato
    const nextTimers = new Map(); // idx -> timeout id
    document.querySelectorAll(".card-q").forEach(card => {
      const idx = Number(card.dataset.index);
      card.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener("change", () => {
          const err = document.getElementById("error");
          if(err) err.style.display = "none";
          // Annulla eventuale timer precedente su questa card
          const pending = nextTimers.get(idx);
          if(pending) clearTimeout(pending);
          // Attendi 3 secondi prima di rivelare la prossima card
          const t = setTimeout(() => {
            revealNext(idx);
            nextTimers.delete(idx);
          }, 350);
          nextTimers.set(idx, t);
        });
      });
    });

    const submitBtn = document.getElementById("submitBtn");
    submitBtn?.addEventListener("click", () => {
      const calc = computeResult();
      if(calc.error){
        const err = document.getElementById("error");
        if(err) err.style.display = "block";
        // mostra prima card incompleta
        const Q = getQuestions();
        for(let i=0;i<Q.length;i++){
          const checked = document.querySelector(`input[name="q${i+1}"]:checked`);
          const card = document.querySelector(`.card-q[data-index="${i}"]`);
          if(!checked && card){
            card.classList.remove("hidden");
            card.scrollIntoView({behavior:"smooth", block:"start"});
            break;
          }
        }
        return;
      }
      showResult(calc);
    });
  }

  function computeResult(){
    const totals = { mano:0, bocca:0, orecchio:0, piede:0, cuore:0, occhio:0 };
    const Q = getQuestions();
    for(let i=0;i<Q.length;i++){
      const name = `q${i+1}`;
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      if(!checked) return { error:true };
      const cat = checked.dataset.cat;
      if(cat in totals) totals[cat]++;
    }

    const over = Object.entries(totals).filter(([k,v]) => v > 2);
    let winnerKey;
    if(over.length){
      const max = Math.max(...over.map(([k,v])=>v));
      const winners = over.filter(([k,v])=>v===max).map(([k])=>k);
      winnerKey = tiePick(winners);
    }else{
      const max = Math.max(...Object.values(totals));
      const winners = Object.entries(totals).filter(([k,v])=>v===max).map(([k])=>k);
      winnerKey = tiePick(winners);
    }

    return { error:false, totals, winnerKey };
  }

  function tiePick(keys){
    if(keys.length===1) return keys[0];
    for(const pref of TIE_BREAK){
      if(keys.includes(pref)) return pref;
    }
    return keys[0];
  }

  function showResult(calc){
    const { winnerKey, totals } = calc;
    const label = (getCategories()[winnerKey]?.label) || winnerKey;

    const scoreList = Object.entries(totals)
      .map(([k,v]) => `${CATEGORIES[k].label.replace(/^[^A-Za-zÀ-ÿ]+/,'')}: <strong>${v}</strong>`)
      .join(" · ");

    const resultEl = document.getElementById("result");
    if(!resultEl) return;
    const content = getResultContent()[winnerKey] || `<h2>${label}</h2>`;
    resultEl.innerHTML = `${content}`;
    // Mostra il risultato a tutto schermo: nascondi quiz/azioni ed espandi la sezione risultato
    const quiz = document.getElementById("quiz");
    const actions = document.querySelector(".actions");
    const err = document.getElementById("error");
    // Ripristina overflow body per evitare effetti collaterali
    document.body.classList.remove('mobile-actions-shown');
    if(quiz) quiz.style.display = "none";
    if(actions) actions.style.display = "none";
    if(err) err.style.display = "none";

    resultEl.style.display = "block";
    resultEl.classList.add("fullscreen");
    // Porta in vista l'inizio della card
    const card = document.querySelector('.card');
    (card || resultEl).scrollIntoView({behavior:"smooth", block:"start"});
  }

  // Bootstrap
  
// Accurate mobile viewport height (iOS/Android address bar aware)
function setVhUnit(){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVhUnit);
window.addEventListener('orientationchange', setVhUnit);
setVhUnit();

  document.addEventListener("DOMContentLoaded", () => {
    applyDirLang();
    applyStaticTexts();
    buildCards();
    attachHandlers();
    const toggle = document.getElementById('langToggle');
    toggle?.addEventListener('click', () => setLang(getLang()==='ar' ? 'it' : 'ar'));
  });
})();
